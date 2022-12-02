package edu.ufl.gatorrush.model;

import net.minidev.json.annotate.JsonIgnore;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Represents a User
 */
@Entity
@Table(name = "UserEntity")
public class User implements UserDetails {

    /**
     * Specifies an invalid format
     */
    static class InvalidFormatException extends Exception {
        InvalidFormatException(String input) {
            super(String.format("The format for \"%s\" is invalid.", input));
        }
    }

    /**
     * Secure password encoder
     */
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    /**
     * Username regex pattern
     */
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-z0-9]{4,15}$");

    /**
     * Email validator courtesy of Apache Commons
     */
    private static final EmailValidator emailValidator = EmailValidator.getInstance();

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
     * Password
     */
    @Column(nullable = false)
    @JsonIgnore
    private String password;

    /**
     * Account enabled status
     */
    @Column(nullable = false)
    private Boolean enabled = true;

    /**
     * Account lock status
     */
    @Column(nullable = false)
    private Boolean locked = true;

    /**
     * Current level
     */
    @ManyToOne
    private Level level;

    /**
     * List of attempted problems
     */
    @OneToMany(mappedBy = "user")
    private final List<Attempt> attempts = new ArrayList<>();

    /**
     * Highest challenge mode score
     */
    private Integer score = 0;

    protected User() {}

    /**
     * Constructor
     * @param username Username
     * @param email Email
     * @param password Password
     */
    public User(String username, String email, String password) throws InvalidFormatException {
        setUsername(username);
        setEmail(email);
        setPassword(password);
    }

    /**
     * Get user ID
     * @return User ID
     */
    public long getId() {
        return id;
    }

    /**
     * Get Username
     * @return Username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Get
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     *
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    /**
     * Credential non-expiration status
     * @return Credential non-expiration status
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Account enabled status
     * @return Enabled status
     */
    @Override
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * Conditionally set username if it meets the requirments
     * @param username Username
     * @throws InvalidFormatException
     */
    public void setUsername(String username) throws InvalidFormatException {
        if (USERNAME_PATTERN.matcher(username.toLowerCase()).matches()) {
            this.username = username;
        } else {
            throw new InvalidFormatException(username);
        }
    }

    /**
     * Get email address
     * @return Email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Conditionally sets email if matches requirements
     * @param email Email address
     * @throws InvalidFormatException
     */
    public void setEmail(String email) throws InvalidFormatException {
        email = email.toLowerCase();
        if (emailValidator.isValid(email)) {
            this.email = email;
        } else {
            throw new InvalidFormatException(email);
        }
    }

    /**
     * Get access control authorities
     * @return Access control authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptySet();
    }

    /**
     * Get encoded password
     * @return Encoded password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets and encodes a plaintext password
     * @param password
     */
    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    /**
     * Get attempts for each problem
     * @return List of Attempt objects
     */
    public List<Attempt> getAttempts() {
        return attempts;
    }

    /**
     * Get current level
     * @return Current level
     */
    public Level getLevel() {
        return level;
    }

    /**
     * Sets the current level
     * @param level New level
     * @return Modified user object
     */
    public User setLevel(Level level) {
        this.level = level;
        return this;
    }

    /**
     * Get challenge mode score
     * @return Score
     */
    public Integer getScore() {
        return score;
    }

    /**
     * Sets the score to the provided score
     * @param score New score
     * @return Modified user object
     */
    public User setScore(Integer score) {
        this.score = score;
        return this;
    }

    /**
     * Sets the score to the provided score if higher than the current score
     * @param score New score
     * @return The potentially modified object
     */
    public User setHighScore(Integer score) {
        this.score = Math.max(this.score, score);
        return this;
    }
}
