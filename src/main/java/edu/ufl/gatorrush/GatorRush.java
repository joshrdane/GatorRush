package edu.ufl.gatorrush;

import edu.ufl.gatorrush.model.Attempt;
import edu.ufl.gatorrush.model.Level;
import edu.ufl.gatorrush.model.Problem;
import edu.ufl.gatorrush.model.User;
import edu.ufl.gatorrush.model.dto.AttemptDto;
import edu.ufl.gatorrush.model.dto.LevelDto;
import edu.ufl.gatorrush.model.dto.UserDto;
import edu.ufl.gatorrush.repository.AttemptRepository;
import edu.ufl.gatorrush.repository.LevelRepository;
import edu.ufl.gatorrush.repository.ProblemRepository;
import edu.ufl.gatorrush.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@Controller
public class GatorRush {
    private final AttemptRepository attemptRepository;
    private final LevelRepository levelRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    private final AuthService authService;

    public GatorRush(AttemptRepository attemptRepository, LevelRepository levelRepository,
                     ProblemRepository problemRepository, UserRepository userRepository, AuthService authService) {
        this.attemptRepository = attemptRepository;
        this.levelRepository = levelRepository;
        this.problemRepository = problemRepository;
        this.userRepository = userRepository;
        this.authService = authService;
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
    public ResponseEntity<Object> getAttempts(@RequestHeader("token") String token) {
        try {
            Long userId = authService.validate(token);
            return ResponseEntity.ok(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId)).getAttempts().stream().map(AttemptDto::new));
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @ResponseBody
    @PostMapping("attempt/{game_mode}")
    public ResponseEntity<String> saveAttempt(@RequestHeader("token") String token, @PathVariable("game_mode") GameMode mode, @RequestParam("problem") Long problemId, @RequestParam("response") Integer response) {
        try {
            Long userId = authService.validate(token);
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
    public ResponseEntity<Object> completeLevel(@RequestHeader(value = "token", required = false) Optional<String> token, @RequestParam(value = "id", required = false) Optional<Long> levelId) {
        try {
            if (token.isPresent()) {
                Long userId = authService.validate(token.get());
                User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId));
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

    @ResponseBody
    @GetMapping("problem")
    public ResponseEntity<?> getProblem() {
        Long id;
        do {
            id = new Random().nextLong(15000);
        } while (!problemRepository.existsById(id));
        return ResponseEntity.ok(problemRepository.findById(id));
    }

    @ResponseBody
    @PostMapping("auth")
    public ResponseEntity<?> authenticate(@RequestHeader("username") String username, @RequestHeader("password") String password) {
        Long userId = authService.authenticate(username, password);
        if (userId == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            return ResponseEntity.ok(authService.getToken(userId));
        }
    }

    @ResponseBody
    @PostMapping("account/create")
    public ResponseEntity<?> createAccount(@RequestHeader("username") String username, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email address already associated with another user.");
        } else if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already associated with another user.");
        } else {
            try {
                userRepository.save(new User(username, email, password));
                return authenticate(username, password);
            } catch (Exception exception) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(exception);
            }
        }
    }

    /**
     * Retrieves user account information
     * @param token Token of logged in user
     * @return User DTO of logged in user
     */
    @ResponseBody
    @GetMapping("account")
    public ResponseEntity<?> createAccount(@RequestHeader(value = "token") String token) {
        Long userId = authService.validate(token);
        if (userId != -1) {
            try {
                return ResponseEntity.ok(new UserDto(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId))));
            } catch (NotFoundException ignored) {
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
