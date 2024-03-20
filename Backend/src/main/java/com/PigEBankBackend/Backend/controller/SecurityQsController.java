package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.SecurityQs;
import com.PigEBankBackend.Backend.service.SecurityQsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/securityQs")
public class SecurityQsController {
    @Autowired
    private SecurityQsService securityQsService;

    @PostMapping("/newQuestion")
    @ResponseStatus(HttpStatus.CREATED)
    public SecurityQs createQuestion(@RequestBody SecurityQs securityQs) {
        return securityQsService.createQuestion(securityQs);
    }

    @DeleteMapping("/deleteQuestion/{associatedNum}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int associatedNum) {
        return new ResponseEntity<String>(securityQsService.deleteQuestion(associatedNum), HttpStatus.OK);
    }

    @PutMapping("/updateQuestion")
    public ResponseEntity<String> updateQuestion(@RequestBody SecurityQs securityQs) {
        return new ResponseEntity<String>(securityQsService.updateQuestion(securityQs), HttpStatus.OK);
    }

}
