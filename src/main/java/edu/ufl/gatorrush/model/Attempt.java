package edu.ufl.gatorrush.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Attempt {
    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Scores achieved for the time trial run
     */
    @ElementCollection
    private List<Integer> scores;

    /**
     * Problems that the user got wrong
     */
    @ManyToMany
    private List<Problem> attemptedProblems;

    /**
     * Date/time user got problem wrong
     */
    @ElementCollection
    private List<Date> dates;


    public Long getId() {
        return id;
    }

    public List<Integer> getScores() {
        return scores;
    }

    public void setScores(List<Integer> scores) {
        this.scores = scores;
    }

    public List<Problem> getAttemptedProblems() {
        return attemptedProblems;
    }

    public void setAttemptedProblems(List<Problem> wrongProblem) {
        this.attemptedProblems = wrongProblem;
    }

    public List<Date> getDates() {
        return dates;
    }

    public void setDates(List<Date> dates) {
        this.dates = dates;
    }
}
