package edu.ufl.gatorrush.repository;

import edu.ufl.gatorrush.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameIgnoreCase(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);
}
