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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class}
)
public class Application {

    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final LevelRepository levelRepository;
    private static final SecureRandom random = new SecureRandom();
    private static final HashMap<Character, Integer> LevelInfo = new HashMap<>();

    public Application(
            UserRepository userRepository,
            ProblemRepository problemRepository,
            LevelRepository levelRepository
                      ) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.levelRepository = levelRepository;

        if (LevelInfo.size() == 0) {
            LevelInfo.put('+', 1);
            LevelInfo.put('-', LevelInfo.get('+') + 5);
            LevelInfo.put('x', LevelInfo.get('-') + 5);
            LevelInfo.put('/', LevelInfo.get('x') + 5);
        }

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
            //
        }
        generateLevels((HashMap<Character, List<Problem>>) generateProblems());
        userRepository.save(userRepository.findByUsernameIgnoreCase("tamitha").orElseThrow().setLevel(levelRepository.findByName(1).orElseThrow()));
        userRepository.save(userRepository.findByUsernameIgnoreCase("bolinder").orElseThrow().setLevel(levelRepository.findByName(1).orElseThrow()));
        userRepository.save(userRepository.findByUsernameIgnoreCase("jimothy").orElseThrow().setLevel(levelRepository.findByName(1).orElseThrow()));
    }

    public Boolean isAcceptable(Problem problem) {
        return switch (problem.getOperator()) {
            case '+' -> problem.getResult() <= 144;
            case '-' -> problem.getResult() >= 0 && problem.getResult() <= 144;
            case 'x' -> problem.getLeftOperand() <= 12 && problem.getRightOperand() <= 12;
            case '/' -> problem.getRightOperand() != 0 && problem.getLeftOperand() % problem.getRightOperand() == 0;
            default -> false;
        };
    }

    public Map<Character, List<Problem>> generateProblems() {
        HashMap<Character, List<Problem>> pool = new HashMap<>();
        LevelInfo.keySet().forEach(character -> pool.put(character, new ArrayList<>()));
        // Generate pool of problems
        for (int left = 0; left < 100; left++) {
            for (int right = 0; right < 100; right++) {
                int finalLeft = left;
                int finalRight = right;
                LevelInfo
                        .keySet()
                        .stream()
                        .map(operator -> new Problem(finalLeft, operator, finalRight))
                        .filter(this::isAcceptable)
                        .forEach(problem -> pool.get(problem.getOperator()).add(problemRepository.save(problem)));
            }
        }
        return pool;
    }

    private void generateLevels(HashMap<Character, List<Problem>> pool) {
        Integer levels = 30;
        Level current = new Level(1);
        for (int i = 1; i <= levels; i++) {
            List<Character> operators = new ArrayList<>();
            Level finalCurrent = current;
            LevelInfo.keySet().stream().filter(key -> finalCurrent.getName() >= LevelInfo.get(key)).forEach(operators::add);
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
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
