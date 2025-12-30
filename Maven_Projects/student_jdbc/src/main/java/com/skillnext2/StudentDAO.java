package com.skillnext2;

import java.sql.*;
import java.util.*;

public class StudentDAO {

    private static final String URL = "jdbc:mysql://localhost:3306/skillnext2_db";
    private static final String USER = "root";
    private static final String PASSWORD = "2005"; // change this

    static {
        try {
            // Ensure MySQL driver is registered before any connections are made
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL driver not found on classpath", e);
        }
    }

    // Add student
    public void addStudent(Student student) throws Exception {
        String sql = "INSERT INTO student (name, email, branch) VALUES (?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, student.getName());
            stmt.setString(2, student.getEmail());
            stmt.setString(3, student.getBranch());
            stmt.executeUpdate();
        }
    }

    // Fetch all students
    public List<Student> getAllStudents() throws Exception {
        List<Student> list = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM student")) {

            while (rs.next()) {
                Student s = new Student();
                s.setId(rs.getInt("id"));
                s.setName(rs.getString("name"));
                s.setEmail(rs.getString("email"));
                s.setBranch(rs.getString("branch"));
                list.add(s);
            }
        }
        return list;
    }

    // Delete student
    public void deleteStudent(int id) throws Exception {
        String sql = "DELETE FROM student WHERE id=?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Update student
    public void updateStudent(Student student) throws Exception {
        String sql = "UPDATE student SET name=?, email=?, branch=? WHERE id=?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, student.getName());
            stmt.setString(2, student.getEmail());
            stmt.setString(3, student.getBranch());
            stmt.setInt(4, student.getId());
            stmt.executeUpdate();
        }
    }
}
