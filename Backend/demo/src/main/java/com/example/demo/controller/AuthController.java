package com.example.demo.controller;

import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> payload,
            @RequestParam(defaultValue = "vulnerable") String mode) {

        String username = payload.get("username");
        String password = payload.get("password");

        boolean vulnerable = mode.equalsIgnoreCase("vulnerable");

        Map<String, Object> response = new HashMap<>();

        AuthService.LoginResult result = authService.login(username, password, vulnerable);

        response.put("sql", result.sql);

        if (vulnerable && result.users != null && result.users.size() > 1) {
            response.put("users: ", result.users);
            return response;
        }

        if (result.user != null && result.user.getPassword().equals(password)) {
            response.put("users", result.user);
            response.put("message", "Login successful");
        } else {
            response.put("message", "Invalid username or password");
        }

        return response;
    }

    @PostMapping("/test")
    public void test(@RequestBody String entity) {
        System.out.println("Backend Connected! Received entity: " + entity);
    }
}