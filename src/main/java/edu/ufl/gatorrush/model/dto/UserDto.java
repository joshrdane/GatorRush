package edu.ufl.gatorrush.model.dto;

import edu.ufl.gatorrush.model.User;

public class UserDto {
    private User user;

    public UserDto(User user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId();
    }

    public String getUsername() {
        return user.getUsername();
    }

    public Integer getLevel() {
        return user.getLevel().getName();
    }
}
