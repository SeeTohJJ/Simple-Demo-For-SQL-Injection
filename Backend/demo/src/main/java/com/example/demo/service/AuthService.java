package com.example.demo.service;

import com.example.demo.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.demo.constant.AuthConstant;

@Service
public class AuthService {

        @PersistenceContext
        private EntityManager em;

        public static class LoginResult {
                public User user;
                public List<User> users;
                public String sql;
        }

        public LoginResult login(String username, String password, boolean vulnerable) {
                LoginResult result = new LoginResult();
                if (vulnerable) {
                    String sql = String.format(AuthConstant.VULNERABLE_LOGIN, username, password);
                    result.sql = sql;

                    try {
                        List<User> users = em.createNativeQuery(sql, User.class).getResultList();

                        result.users = users;

                        if (!users.isEmpty()) {
                            result.user = users.get(0);
                        }

                    } catch (Exception e) {
                        result.user = null;
                        result.users = null;
                    }
                } else {
                    result.sql = AuthConstant.SECURE_LOGIN;

                    try {
                        User user = em.createQuery(AuthConstant.SECURE_LOGIN, User.class)
                                .setParameter("username", username)
                                .setParameter("password", password)
                                .getSingleResult();

                        result.user = user;

                    } catch (Exception e) {
                        result.user = null;
                    }
                }
                System.out.println("SQL: " + result.sql);
                System.out.println("User: " + (result.user != null ? result.user.getUsername() : "Not found"));
                return result;
        }
}