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

import java.security.SecureRandom;
import java.util.Optional;

@Controller
public class GatorRush {
    private final AttemptRepository attemptRepository;
    private final LevelRepository levelRepository;
    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;

    private static final SecureRandom random = new SecureRandom();

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

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }

    @ResponseBody
    @GetMapping("attempts")
    public ResponseEntity<Object> getAttempts(@RequestHeader("token") String token) {
        try {
            Long userId = authService.validate(token);
            return ResponseEntity.ok(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId)).getAttempts().stream().map(AttemptDto::new).sorted((a1, a2) -> a2.getTimestamp().compareTo(a1.getTimestamp())));
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
    public ResponseEntity<Object> getLevel(@RequestHeader(value = "token", required = false) Optional<String> token, @RequestParam("id") Optional<Long> levelId) {
        try {
            Level level = null;
            if (token.isPresent() && levelId.isEmpty()) {
                level = userRepository.findById(authService.validate(token.get())).orElseThrow().getLevel();
            } else if (levelId.isPresent()) {
                level = levelRepository.findById(levelId.get()).orElseThrow(() -> new NotFoundException(Level.class, levelId.get()));
            } else {
                level = levelRepository.findByName(1).orElseThrow();
            }
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
                return getLevel(Optional.empty(), user.getLevel().getId().describeConstable());
            } else if (levelId.isPresent()) {
                return getLevel(Optional.empty(), levelRepository.findById(levelId.get()).orElseThrow(() -> new NotFoundException(Level.class, levelId.get())).getNext().getId().describeConstable());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough parameters.");
            }
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }

    @ResponseBody
    @GetMapping("problem")
    public ResponseEntity<Object> getProblem() {
        Long id;
        do {
            id = random.nextLong(15000);
        } while (!problemRepository.existsById(id));
        return ResponseEntity.ok(problemRepository.findById(id));
    }

    @ResponseBody
    @PostMapping("auth")
    public ResponseEntity<Object> authenticate(@RequestHeader("username") String username, @RequestHeader("password") String password) {
        Long userId = authService.authenticate(username, password);
        if (userId == -1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            return ResponseEntity.ok(authService.getToken(userId));
        }
    }

    @ResponseBody
    @PostMapping("logout")
    public ResponseEntity<Object> logout(@RequestHeader("userToken") String token) {
        boolean loggedOut = authService.endSession(token);
        if(loggedOut) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @ResponseBody
    @PostMapping("account/create")
    public ResponseEntity<Object> createAccount(@RequestHeader("username") String username, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        if (userRepository.existsByEmail(email).booleanValue()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email address already associated with another user.");
        } else if (userRepository.existsByUsername(username).booleanValue()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already associated with another user.");
        } else {
            try {
                userRepository.save(new User(username, email, password).setLevel(levelRepository.findByName(1).orElseThrow()));
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
    public ResponseEntity<Object> getAccount(@RequestHeader(value = "token") String token) {
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

    /**
     * Updates the user's password
     * @param token Token of logged in user
     * @param oldPassword Old password
     * @param newPassword New password
     * @return HTTP status code (and error if applicable)
     */
    @ResponseBody
    @PatchMapping("account/password")
    public ResponseEntity<Object> updatePassword(@RequestHeader(value = "token") String token, @RequestHeader("old_password") String oldPassword, @RequestHeader("new_password") String newPassword) {
        // Get userId from token
        Long userId = authService.validate(token);
        // Ensure a valid userId was obtained
        if (userId != -1) {
            try {
                // Retrieve user
                User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId));
                // Ensure OLD passwords match
                if (User.PASSWORD_ENCODER.matches(oldPassword, user.getPassword())) {
                    // Save new password and return successful
                    user.setPassword(newPassword);
                    userRepository.save(user);
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Incorrect password.");
                }
            } catch (NotFoundException ignored) {
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @ResponseBody
    @PostMapping("challenge/score")
    public ResponseEntity<Object> saveScore(@RequestHeader("token") String token, @RequestParam("score") Integer score) {
        try {
            Long userId = authService.validate(token);
            userRepository.save(userRepository.findById(userId).orElseThrow(() -> new NotFoundException(User.class, userId)).setHighScore(score));
            return ResponseEntity.ok().build();
        } catch (NotFoundException exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
        }
    }
}
