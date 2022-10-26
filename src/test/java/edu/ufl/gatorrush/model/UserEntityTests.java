package edu.ufl.gatorrush.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Random;

public class UserEntityTests {
    UserEntity user;

    String generateRandomUsername() {
        int minUsernameLength = 8;
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        while (builder.length() < minUsernameLength) {
            builder.append((char) ('a' + ('z' - 'a') * random.nextDouble()));
        }
        return builder.toString();
    }

    @BeforeEach
    void setup() {
        user = new UserEntity();
    }

    @Test
    void testUsernameNull() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setUsername(null);
                });
    }

    @Test
    void testUsernameEmpty() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setUsername("");
                });
    }

    @Test
    void testUsernameShort() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setUsername("short");
                });
    }

    @Test
    void testUsernameLong() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setUsername("ReallyLongUsernameLikeReallyReallyLong");
                });
    }

    @Test
    void testUsernamesInvalidSymbol() throws Exception {
        char[] invalidCharacters = "!@#$%^&*()<>?:\"'{}[]\\/".toCharArray();
        for (char invalidCharacter : invalidCharacters) {
            Assertions.assertThrows(
                    Exception.class,
                    () -> {
                        user.setUsername(generateRandomUsername() + invalidCharacter);
                    });
        }
    }

    @Test
    void testUsernamesValid() throws Exception {
        String[] validUsernames = new String[]{
                "username"
        };
        for (String validUsername : validUsernames) {
            user.setUsername(validUsername);
            Assertions.assertEquals(validUsername, user.getUsername());
        }
    }

    @Test
    void testUsernamesValidAuto() throws Exception {
        for (int i = 0; i < 1000; i++) {
            String randomUsername = generateRandomUsername();
            user.setUsername(randomUsername);
            Assertions.assertEquals(randomUsername, user.getUsername());
        }
    }

    @Test
    void testEmailNull() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setEmail(null);
                });
    }

    @Test
    void testEmailEmpty() throws Exception {
        Assertions.assertThrows(
                Exception.class,
                () -> {
                    user.setEmail("");
                });
    }

    @Test
    void testEmailsValid() throws Exception {
        String[] validEmails = new String[]{
                "example@sub.domain.tld",
                };
        for (String validEmail : validEmails) {
                user.setEmail(validEmail);
                Assertions.assertEquals(validEmail, user.getEmail());
        }
    }
}
