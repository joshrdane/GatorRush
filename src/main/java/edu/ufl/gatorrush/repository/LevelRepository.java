package edu.ufl.gatorrush.repository;

import edu.ufl.gatorrush.model.Level;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LevelRepository extends CrudRepository<Level, Long> {
    Optional<Level> findByName(Integer name);
}
