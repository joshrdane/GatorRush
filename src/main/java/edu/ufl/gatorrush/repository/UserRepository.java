package edu.ufl.gatorrush.repository;

import edu.ufl.gatorrush.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {}
