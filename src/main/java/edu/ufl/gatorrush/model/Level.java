package edu.ufl.gatorrush.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Level {

    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * List of Problems assigned to this Level
     */
    @ManyToMany
    private List<Problem> problems;

    /**
     * Next Level
     */
    @OneToOne
    private Level next;

    public Long getId() {
        return id;
    }

    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
    }

    public Level getNext() {
        return next;
    }

    public void setNext(Level next) {
        this.next = next;
    }
}
