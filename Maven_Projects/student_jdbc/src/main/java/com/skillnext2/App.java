package com.skillnext2;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.*;

public class App {
    public static void main(String[] args) {
        try {
            StudentDAO dao = new StudentDAO();

            // Add student
            Student s1 = new Student("Nithin", "nithin@example.com", "Computer Science and Engineering");
            dao.addStudent(s1);
            System.out.println("Student Added Successfully!");

            // Fetch students
            List<Student> students = dao.getAllStudents();
            for (Student s : students) {
                System.out.println(s);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Ensure MySQL background cleanup thread is stopped when running via Maven exec
            try {
                AbandonedConnectionCleanupThread.checkedShutdown();
            } catch (Exception ignored) {
                // cleanup best-effort
            }

            Enumeration<Driver> drivers = DriverManager.getDrivers();
            while (drivers.hasMoreElements()) {
                Driver driver = drivers.nextElement();
                if (driver.getClass().getClassLoader() == App.class.getClassLoader()) {
                    try {
                        DriverManager.deregisterDriver(driver);
                    } catch (Exception ignored) {
                        // ignore
                    }
                }
            }
        }
    }
}
