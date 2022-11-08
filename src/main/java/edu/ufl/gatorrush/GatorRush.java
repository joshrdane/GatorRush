package edu.ufl.gatorrush;

import edu.ufl.gatorrush.model.Attempt;
import edu.ufl.gatorrush.model.Level;
import edu.ufl.gatorrush.model.Problem;
import edu.ufl.gatorrush.model.User;
import edu.ufl.gatorrush.model.dto.AttemptDto;
import edu.ufl.gatorrush.model.dto.LevelDto;
import edu.ufl.gatorrush.repository.AttemptRepository;
import edu.ufl.gatorrush.repository.LevelRepository;
import edu.ufl.gatorrush.repository.ProblemRepository;
import edu.ufl.gatorrush.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class GatorRush {
    private final AttemptRepository attemptRepository;
    private final LevelRepository levelRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    public GatorRush(AttemptRepository attemptRepository, LevelRepository levelRepository,
                     ProblemRepository problemRepository, UserRepository userRepository) {
        this.attemptRepository = attemptRepository;
        this.levelRepository = levelRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
    }

    static class NotFoundException extends Exception {
        NotFoundException(Class<?> clazz, Long id) {
            super(String.format("%s with id '%d' does not exist.", clazz.getSimpleName(), id));
        }
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @ResponseBody
    @GetMapping("attempts")
    public ResponseEntity<Object> getAttempts(@RequestParam("user") Long userId) {
        try {
            return ResponseEntity.ok(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId)).getAttempts().stream().map(AttemptDto::new));
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @ResponseBody
    @PostMapping("attempt/{game_mode}")
    public ResponseEntity<String> saveAttempt(@PathVariable("game_mode") GameMode mode, @RequestParam("user") Long userId, @RequestParam("problem") Long problemId, @RequestParam("response") Integer response) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId));
            Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new NotFoundException(Problem.class, problemId));
            attemptRepository.save(new Attempt(mode, user, problem, response));
            return ResponseEntity.ok().build();
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @ResponseBody
    @GetMapping("level")
    public ResponseEntity<Object> getLevel(@RequestParam("id") Long levelId) {
        try {
            Level level = levelRepository.findById(levelId).orElseThrow(() -> new NotFoundException(Level.class, levelId));
            if (level == null) {
                return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body("Congratulations, you have completed all levels!");
            } else {
                return ResponseEntity.ok(new LevelDto(level));
            }
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @ResponseBody
    @PostMapping("level")
    public ResponseEntity<Object> completeLevel(@RequestParam(value = "id", required = false) Optional<Long> levelId, @RequestParam(value = "user", required = false) Optional<Long> userId) {
        try {
            if (userId.isPresent()) {
                User user = userRepository.findById(userId.get()).orElseThrow(() -> new NotFoundException(User.class, userId.get()));
                user.setLevel(user.getLevel().getNext());
                user = userRepository.save(user);
                return getLevel(user.getLevel().getId());
            } else if (levelId.isPresent()) {
                return getLevel(levelRepository.findById(levelId.get()).orElseThrow(() -> new NotFoundException(Level.class, levelId.get())).getNext().getId());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough parameters.");
            }
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }
}
