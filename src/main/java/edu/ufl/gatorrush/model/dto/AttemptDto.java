package edu.ufl.gatorrush.model.dto;

import edu.ufl.gatorrush.GameMode;
import edu.ufl.gatorrush.model.Attempt;

import java.util.Date;

public class AttemptDto {
    private Attempt attempt;

    public AttemptDto(Attempt attempt) {
        this.attempt = attempt;
    }

    public Long getId() {
        return attempt.getId();
    }

    public GameMode getMode() {
        return attempt.getMode();
    }

    public String getProblem() {
        return attempt.getProblem().toString();
    }

    public Integer getResponse() {
        return attempt.getResponse();
    }

    public Integer getAnswer() {
        return attempt.getProblem().getResult();
    }

    public Boolean getCorrect() {
        return attempt.getCorrect();
    }

    public Date getTimestamp() {
        return attempt.getTimestamp();
    }
}
