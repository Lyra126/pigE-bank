package com.TheStable.PigEbank.service;

import com.TheStable.PigEbank.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
