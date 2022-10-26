package edu.ufl.gatorrush.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

/**
 * Represents a User
 */
@Entity
public class UserEntity {
    /**
     * Unique Identifier
     */
    @Getter
    @Id
    @GeneratedValue
    private long id;

    /**
     * Login Username
     */
    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String username;

    /**
     * Email
     */
    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * Password Hash
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private String password;

    /**
     * First Name (optional)
     */
    @Getter
    @Setter
    private String firstName;

    /**
     * Last Name (optional)
     */
    @Getter
    @Setter
    private String lastName;

    /**
     * Date of Birth (optional)
     */
    @Getter
    @Setter
    private LocalDate dob;

    protected UserEntity() {}
}
