package edu.ufl.gatorrush.repository;

import edu.ufl.gatorrush.model.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {}
