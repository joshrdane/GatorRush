package edu.ufl.gatorrush;

import edu.ufl.gatorrush.model.Level;
import edu.ufl.gatorrush.model.Problem;
import edu.ufl.gatorrush.model.User;
import edu.ufl.gatorrush.repository.LevelRepository;
import edu.ufl.gatorrush.repository.ProblemRepository;
import edu.ufl.gatorrush.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Random;

@SpringBootApplication
public class Application {

    private UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final LevelRepository levelRepository;

    public Application(
            UserRepository userRepository,
            ProblemRepository problemRepository,
            LevelRepository levelRepository
                      ) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.levelRepository = levelRepository;

        preload();
    }

    /**
     * Preloads information into database
     */
    public void preload() {
        String hash = "";
        userRepository.save(new User("Jimothy", "jimothy@domain.com", hash));
        userRepository.save(new User("Tamitha", "tamitha@domain.com", hash));
        userRepository.save(new User("Bolinder", "bolinder@domain.com", hash));

        // Add 1000 problems and (for now) randomly assign to levels
        Random random = new Random();
        int i = 0;
        Level level = levelRepository.save(new Level(++i));
        for (int left = 1; left <= 100; left++) {
            for (int right = 1; right <= 100; right++) {
                Problem problem = problemRepository.save(new Problem(left, '+', right));
                if (random.nextDouble() < 0.05) {
                    level.getProblems().add(problem);
                    if (random.nextDouble() < 0.1) {
                        Level next = levelRepository.save(new Level(++i));
                        level.setNext(next);
                        levelRepository.save(level);
                        level = next;
                    }
                }
            }
        }
        if (level.getProblems().size() > 0) {
            Level next = levelRepository.save(new Level(++i));
            level.setNext(next);
            levelRepository.save(level);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
