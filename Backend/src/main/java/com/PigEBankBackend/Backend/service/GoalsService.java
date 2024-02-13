package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Goals;
import com.PigEBankBackend.Backend.repository.GoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalsService {
    @Autowired
    GoalsRepository goalsRepository;

    public List<Goals> getAllGoals() {
        return goalsRepository.findAll();
    }
}
