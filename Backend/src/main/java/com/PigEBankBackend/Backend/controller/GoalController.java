package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {
    @Autowired
    GoalService goalService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Goal>> getAllGoals() {
        return new ResponseEntity<List<Goal>>(goalService.getAllGoals(), HttpStatus.OK);
    }

    @PostMapping("/newGoal")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        return new ResponseEntity<Goal>(goalService.addGoal(goal), HttpStatus.OK);
    }
}
