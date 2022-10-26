package edu.ufl.gatorrush.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.regex.Pattern;

/**
 * Represents a User
 */
@Entity
public class UserEntity {
    private static final Pattern USERNAME = Pattern.compile("^[a-z0-9]{4,15}$");
    private static final Pattern EMAIL = Pattern.compile("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])");

    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private long id;

    /**
     * Login Username
     */
    @Column(unique = true, nullable = false)
    private String username;

    /**
     * Email
     */
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * Password Hash
     */
    @Column(nullable = false)
    private String passwordHash;

    protected UserEntity() {}

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) throws Exception {
        username = username.toLowerCase();
        if (USERNAME.matcher(username).matches()) {
            this.username = username;
        } else {
            throw new Exception("Invalid username format.");
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) throws Exception {
        email = email.toLowerCase();
        if (EMAIL.matcher(email).matches()) {
            this.email = email;
        } else {
            throw new Exception("Invalid email format.");
        }
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}
