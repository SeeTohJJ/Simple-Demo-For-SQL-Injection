package com.example.demo.constant;

public class AuthConstant {

        
    // VULNERABLE TO SQL INJECTION
    public static final String VULNERABLE_LOGIN =
            "SELECT * FROM users WHERE username = '%s' AND password = '%s'";

    // SECURE, USES PARAMETERIZED QUERIES
    public static final String SECURE_LOGIN =
            "SELECT u FROM User u WHERE u.username = :username AND u.password = :password";
}
