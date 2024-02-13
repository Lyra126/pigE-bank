package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Goals;
import com.PigEBankBackend.Backend.service.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalsController {
    @Autowired
    GoalsService goalsService;

    @GetMapping
    public ResponseEntity<List<Goals>> getAllGoals() {
        return new ResponseEntity<List<Goals>>(goalsService.getAllGoals(), HttpStatus.OK);
    }
}
