package edu.ufl.gatorrush.model;

import javax.persistence.*;
import java.util.ArrayList;
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
     * Sequential level identifier
     */
    private Integer name;

    /**
     * List of Problems assigned to this Level
     */
    @ManyToMany
    private List<Problem> problems = new ArrayList<>();

    /**
     * Next Level
     */
    @OneToOne
    private Level next;

    protected Level() {}

    public Level(Integer name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
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
