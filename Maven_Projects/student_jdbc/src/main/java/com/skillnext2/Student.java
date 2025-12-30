package com.skillnext2;

public class Student {
    private int id;
    private String name;
    private String email;
    private String branch;

    public Student() {}

    public Student(String name, String email, String branch) {
        this.name = name;
        this.email = email;
        this.branch = branch;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    @Override
    public String toString() {
        return "Student [id=" + id + ", name=" + name + ", email=" + email + ", branch=" + branch + "]";
    }
}
