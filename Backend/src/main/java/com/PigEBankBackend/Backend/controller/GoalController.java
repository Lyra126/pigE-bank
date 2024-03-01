package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
    public ResponseEntity<String> createGoal(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.addGoal(goal), HttpStatus.OK);
    }

    @PutMapping("/updatePigName")
    public ResponseEntity<String> updatePigName(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.updatePigName(goal), HttpStatus.OK);
    }

    @PutMapping("/updateGoalName")
    public ResponseEntity<String> updateGoalName(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.updateGoalName(goal), HttpStatus.OK);
    }

    @PutMapping("/updateOwnerEmail")
    public ResponseEntity<String> updateOwnerEmail(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.updateOwnerEmail(goal), HttpStatus.OK);
    }

    @PutMapping("/updateCurrentSavings")
    public ResponseEntity<String> updateCurrentSavings(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.updateCurrentSavings(goal), HttpStatus.OK);
    }

    @PutMapping("/addToCurrentSavings")
    public ResponseEntity<String> addToCurrentSavings(String id, int money){
        return new ResponseEntity<String>(goalService.addToCurrentSavings(id, money), HttpStatus.OK);
    }

    @PutMapping("/updateSavingsGoal")
    public ResponseEntity<String> updateSavingsGoal(@RequestBody Goal goal) {
        return new ResponseEntity<String>(goalService.updateSavingsGoal(goal), HttpStatus.OK);
    }
}
