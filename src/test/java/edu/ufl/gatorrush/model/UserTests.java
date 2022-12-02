package edu.ufl.gatorrush.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.security.SecureRandom;

public class UserTests {
    User user;

    SecureRandom random = new SecureRandom();

    String generateRandomUsername() {
        int minUsernameLength = 8;
        StringBuilder builder = new StringBuilder();
        while (builder.length() < minUsernameLength) {
            builder.append((char) ('a' + ('z' - 'a') * random.nextDouble()));
        }
        return builder.toString();
    }

    @BeforeEach
    void setup() {
        user = new User();
    }

    @Test
    void testUsernameNull() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setUsername(null));
    }

    @Test
    void testUsernameEmpty() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setUsername(""));
    }

    @Test
    void testUsernameShort() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setUsername("abc"));
    }

    @Test
    void testUsernameLong() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setUsername("ReallyLongUsernameLikeReallyReallyLong"));
    }

    @Test
    void testUsernamesInvalidSymbol() {
        char[] invalidCharacters = "!@#$%^&*()<>?:\"'{}[]\\/".toCharArray();
        for (char invalidCharacter : invalidCharacters) {
            Assertions.assertThrows(
                    Exception.class,
                    () -> user.setUsername(generateRandomUsername() + invalidCharacter));
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
    void testEmailNull() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setEmail(null));
    }

    @Test
    void testEmailEmpty() {
        Assertions.assertThrows(
                Exception.class,
                () -> user.setEmail(""));
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
