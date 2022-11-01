package edu.ufl.gatorrush.model;

import javax.persistence.*;

@Entity
public class TimeTrialData {
    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Score achieved for the time trial run
     */
    private Integer score;

    /**
     * Problem that the user got wrong
     */
    @OneToOne
    private Problem wrongProblem;

    public Long getId() {
        return id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Problem getWrongProblem() {
        return wrongProblem;
    }

    public void setWrongProblem(Problem wrongProblem) {
        this.wrongProblem = wrongProblem;
    }
}
