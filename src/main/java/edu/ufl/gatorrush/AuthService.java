package edu.ufl.gatorrush;

import edu.ufl.gatorrush.model.User;
import edu.ufl.gatorrush.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Calendar;
import java.util.HashMap;

@Service
public class AuthService {

    private static final SecureRandom random = new SecureRandom();

    private static final HashMap<String, Session> tokenMap = new HashMap<>();

    private static final char[] validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/".toCharArray();
    private UserRepository userRepository;

    private static final int TOKEN_LENGTH = 64;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Generate, register, and return new token if token does not exist
     * @return token
     */
    public String getToken(Long userId) {
        String token = tokenMap
                .keySet()
                .stream()
                .filter(key -> tokenMap.get(key).getUserId().equals(userId))
                .findFirst().orElseGet(this::generateToken);
        tokenMap.putIfAbsent(token, new Session(userId));
        return token;
    }

    /**
     * Generate a new token, unique from any other tokens
     * @return token
     */
    public String generateToken() {
        StringBuilder builder;
        do {
            builder = new StringBuilder();
            for (int i = 0; i < TOKEN_LENGTH; i++) {
                builder.append(validCharacters[random.nextInt(0, validCharacters.length)]);
            }
        } while (tokenMap.containsKey(builder.toString()));
        return builder.toString();
    }

    /**
     * Authenticates the user
     * @param username The user's username
     * @param password The user's password
     * @return User's Id or -1 if unsuccessful
     */
    public Long authenticate(String username, String password) {
        try {
            User user = userRepository.findByUsernameIgnoreCase(username).orElseThrow();
            if (User.PASSWORD_ENCODER.matches(password, user.getPassword())) {
                return user.getId();
            }
        } catch (Exception ignored) {
            // Do nothing
        }
        return (long) -1;
    }

    public Long validate(String token) {
        if (tokenMap.containsKey(token)) {
            Session session = tokenMap.get(token);
            session.refresh();
            return session.getUserId();
        }
        return (long) -1;
    }

    public void refresh(String token) {
        if (validate(token) != -1) {
            tokenMap.get(token).refresh();
        }
    }

    public boolean endSession(String token) {
        return tokenMap.remove(token) != null;
    }
}

class Session {
    public static final Duration SESSION_LENGTH = Duration.ofHours(1);

    private final Long userId;
    private Calendar expiration;

    public Session(Long userId) {
        this.userId = userId;
        refresh();
    }

    public Calendar refresh() {
        expiration = Calendar.getInstance();
        expiration.add(Calendar.SECOND, SESSION_LENGTH.toSecondsPart());
        return expiration;
    }

    public Long getUserId() {
        return userId;
    }

    public Boolean isExpired() {
        return Calendar.getInstance().after(expiration);
    }
}