package edu.ufl.gatorrush.model.dto;

import edu.ufl.gatorrush.model.Level;
import edu.ufl.gatorrush.model.Problem;

import java.util.List;

/**
 * Data Transfer Object wrapper for Level
 */
public class LevelDto {
    private Level level;

    public LevelDto(Level level) {
        this.level = level;
    }

    public Long getId() {
        return level.getId();
    }

    public String getName() {
        return level.getName();
    }

    public List<Problem> getProblems() {
        return level.getProblems();
    }
}
