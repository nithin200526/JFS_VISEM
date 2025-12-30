package com.skillnext2;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;
import java.util.Scanner;

public class App {

    static Scanner sc = new Scanner(System.in);

    static void menu() {
        System.out.println("\n===== STUDENT MANAGEMENT SYSTEM =====");
        System.out.println("1. Insert Student");
        System.out.println("2. Update Student");
        System.out.println("3. Delete Student");
        System.out.println("4. View Student by ID");
        System.out.println("5. View All Students");
        System.out.println("6. Exit");
        System.out.print("Enter your choice: ");
    }

    public static void main(String[] args) {

        while (true) {
            menu();
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    insertStudent();
                    break;
                case 2:
                    updateStudent();
                    break;
                case 3:
                    deleteStudent();
                    break;
                case 4:
                    viewStudentById();
                    break;
                case 5:
                    viewAllStudents();
                    break;
                case 6:
                    HibernateUtil.getSessionFactory().close();
                    System.out.println("Application closed.");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }

    // INSERT
    static void insertStudent() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        System.out.print("Enter Name: ");
        sc.nextLine();
        String name = sc.nextLine();

        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        System.out.print("Enter Branch: ");
        String branch = sc.nextLine();

        Student s = new Student(name, email, branch);
        session.save(s);

        tx.commit();
        session.close();

        System.out.println("Student inserted successfully!");
    }

    // UPDATE
    static void updateStudent() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        System.out.print("Enter Student ID to update: ");
        int id = sc.nextInt();

        Student s = session.get(Student.class, id);
        if (s == null) {
            System.out.println("Student not found!");
            session.close();
            return;
        }

        sc.nextLine();
        System.out.print("Enter New Name: ");
        s.setName(sc.nextLine());

        System.out.print("Enter New Email: ");
        s.setEmail(sc.nextLine());

        System.out.print("Enter New Branch: ");
        s.setBranch(sc.nextLine());

        session.update(s);
        tx.commit();
        session.close();

        System.out.println("Student updated successfully!");
    }

    // DELETE
    static void deleteStudent() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        System.out.print("Enter Student ID to delete: ");
        int id = sc.nextInt();

        Student s = session.get(Student.class, id);
        if (s == null) {
            System.out.println("Student not found!");
            session.close();
            return;
        }

        session.delete(s);
        tx.commit();
        session.close();

        System.out.println("Student deleted successfully!");
    }

    // VIEW BY ID
    static void viewStudentById() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        System.out.print("Enter Student ID: ");
        int id = sc.nextInt();

        Student s = session.get(Student.class, id);
        if (s == null) {
            System.out.println("Student not found!");
        } else {
            System.out.println("\nID: " + s.getId());
            System.out.println("Name: " + s.getName());
            System.out.println("Email: " + s.getEmail());
            System.out.println("Branch: " + s.getBranch());
        }
        session.close();
    }

    // VIEW ALL
    static void viewAllStudents() {
        Session session = HibernateUtil.getSessionFactory().openSession();

        List<Student> list = session.createQuery("from Student", Student.class).list();
        for (Student s : list) {
            System.out.println(
                s.getId() + " | " +
                s.getName() + " | " +
                s.getEmail() + " | " +
                s.getBranch()
            );
        }
        session.close();
    }
}
