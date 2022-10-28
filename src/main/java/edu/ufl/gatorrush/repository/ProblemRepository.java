package edu.ufl.gatorrush.repository;

import edu.ufl.gatorrush.model.Problem;
import org.springframework.data.repository.CrudRepository;

public interface ProblemRepository extends CrudRepository<Problem, Long> {}
