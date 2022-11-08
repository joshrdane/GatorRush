package edu.ufl.gatorrush.model;

import edu.ufl.gatorrush.GameMode;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Attempt {
    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Game Mode associated with attempt
     */
    @Column(nullable = false)
    private GameMode mode;

    /**
     * User associated with attempt
     */
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    /**
     * Response for the problem attempt
     */
    @Column(nullable = false, updatable = false)
    private Integer response;

    /**
     * Problem associated with attempt
     */
    @ManyToOne
    @JoinColumn(nullable = false)
    private Problem problem;

    /**
     * Timestamp of attempt
     */
    @Column(nullable = false, updatable = false)
    private final Date timestamp;

    protected Attempt() {
        this.timestamp = new Date();
    }

    public Attempt(GameMode mode, User user, Problem problem, Integer response) {
        this();
        this.mode = mode;
        this.user = user;
        this.problem = problem;
        this.response = response;
    }

    public Long getId() {
        return id;
    }

    public GameMode getMode() {
        return mode;
    }

    public Boolean getCorrect() {
        return problem.getResult().equals(response);
    }

    public User getUser() {
        return user;
    }

    public Integer getResponse() {
        return response;
    }

    public Problem getProblem() {
        return problem;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
