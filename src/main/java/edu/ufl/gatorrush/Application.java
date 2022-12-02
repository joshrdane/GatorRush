package edu.ufl.gatorrush;

import edu.ufl.gatorrush.model.Level;
import edu.ufl.gatorrush.model.Problem;
import edu.ufl.gatorrush.model.User;
import edu.ufl.gatorrush.repository.LevelRepository;
import edu.ufl.gatorrush.repository.ProblemRepository;
import edu.ufl.gatorrush.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.SecureRandom;
import java.util.*;

@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class}
)
public class Application {

    private UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final LevelRepository levelRepository;

    private static final SecureRandom random = new SecureRandom();

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
        String hash = "Password123";
        try {
            userRepository.save(new User("Jimothy", "jimothy@domain.com", hash));
            userRepository.save(new User("Tamitha", "tamitha@domain.com", hash));
            userRepository.save(new User("Bolinder", "bolinder@domain.com", hash));
        } catch (Exception ignored) {
            System.out.println("Unable to create one or all temporary users.");
        }

        HashMap<Character, List<Problem>> pool = new HashMap<>();
        Arrays.stream(new Character[] {'+', '-', 'x', '/'}).forEach(character -> pool.put(character, new ArrayList<>()));
        // Define parameters for generation
        int addition = 1;
        int subtraction = addition + 5;
        int multiplication = subtraction + 5;
        int division = multiplication + 5;
        // Generate pool of problems
        for (int left = 0; left < 100; left++) {
            for (int right = 0; right < 100; right++) {
                if (Problem.getResult(left, '+', right) <= 144) {
                    pool.get('+').add(problemRepository.save(new Problem(left, '+', right)));
                }
                if (Problem.getResult(left, '-', right) >= 0) {
                    pool.get('-').add(problemRepository.save(new Problem(left, '-', right)));
                }
                if (left <= 12 && right <= 12) {
                    pool.get('x').add(problemRepository.save(new Problem(left, 'x', right)));
                    if (right != 0 && left % right == 0) {
                        pool.get('/').add(problemRepository.save(new Problem(left, '/', right)));
                    }
                }
            }
        }
        Integer levels = 30;
        Level current = new Level(1);
        for (int i = 1; i <= levels; i++) {
            List<Character> operators = new ArrayList<>();
            if (current.getName() >= addition) {
                operators.add('+');
            }
            if (current.getName() >= subtraction) {
                operators.add('-');
            }
            if (current.getName() >= multiplication) {
                operators.add('x');
            }
            if (current.getName() >= division) {
                operators.add('/');
            }
            while (current.getProblems().size() < 20) {
                Character operator = operators.get(random.nextInt(0, operators.size()));
                current.getProblems().add(pool.get(operator).get(random.nextInt(0, pool.get(operator).size())));
            }
            current = levelRepository.save(current);
            if (current.getName() < levels) {
                current.setNext(levelRepository.save(new Level(current.getName() + 1)));
                current = levelRepository.save(current);
            }
            current = current.getNext();
        }
        userRepository.save(userRepository.findByUsernameIgnoreCase("tamitha").get().setLevel(levelRepository.findByName(1).get()));
        userRepository.save(userRepository.findByUsernameIgnoreCase("bolinder").get().setLevel(levelRepository.findByName(1).get()));
        userRepository.save(userRepository.findByUsernameIgnoreCase("jimothy").get().setLevel(levelRepository.findByName(1).get()));
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
