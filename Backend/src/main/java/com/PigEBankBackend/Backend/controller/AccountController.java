package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.service.AccountService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return new ResponseEntity<List<Account>>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    ResponseEntity<Optional<Account>> getSingleAccount(@PathVariable String username) {
        return new ResponseEntity<Optional<Account>>(accountService.findAccountByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/{username}/id")
    ResponseEntity<ObjectId> getAccountID(@PathVariable String username) {
        return new ResponseEntity<ObjectId>(accountService.getAccountID(username), HttpStatus.OK);
    }

    @GetMapping("/{username}/fullName")
    ResponseEntity<String> getAccountFullName(@PathVariable String username) {
        return new ResponseEntity<String>(accountService.getAccountFullName(username), HttpStatus.OK);
    }

    @GetMapping("/getGoals/{email}")
    ResponseEntity<List<Goal>> getAccountGoals(@PathVariable String email) {
        return new ResponseEntity<List<Goal>>(accountService.getAllGoals(email), HttpStatus.OK);
    }

    @GetMapping("/getQs/{email}")
    ResponseEntity<List<String>> getSecurityQuestions(@PathVariable String email) {
        return new ResponseEntity<List<String>>(accountService.getSecurityQs(email), HttpStatus.OK);
    }

    @GetMapping("/getAs/{email}")
    ResponseEntity<List<String>> getSecurityAnswers(@PathVariable String email) {
        return new ResponseEntity<List<String>>(accountService.getSecurityAs(email), HttpStatus.OK);
    }

    @PutMapping("/updateTotalSavings")
    ResponseEntity<String> updateAccountTotalSavings(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateTotalSavings(account), HttpStatus.OK);
    }

    @PostMapping("/newAccount")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@RequestBody Account account) {
        return accountService.addAccount(account);
    }

    @PutMapping("/updateSecurityQA")
    public ResponseEntity<String> updateSecurityAQ(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateSecurityQA(account), HttpStatus.OK);
    }

    @PutMapping("/replaceSecurityQA")
    public ResponseEntity<String> replaceSecurityAQ(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.replaceSecurityQA(account), HttpStatus.OK);
    }
    @PutMapping("/updateAll")
    public Account updateAccountAll(@RequestBody Account account) {
        return accountService.updateAccountAll(account);
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<String> updateAccountPassword(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateAccountPassword(account), HttpStatus.OK);
    }

    @PutMapping("/updateNumOfGoals")
    public ResponseEntity<String> updateAccountNumOfGoals(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateAccountNumOfGoals(account), HttpStatus.OK);
    }

    @PutMapping("/updateFirstName")
    public ResponseEntity<String> updateAccountFirstName(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateAccountFirstName(account), HttpStatus.OK);
    }

    @PutMapping("/updateUsername")
    public ResponseEntity<String> updateAccountUsername(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateAccountUsername(account), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount/{email}")
    public ResponseEntity<String> deleteAccount(@PathVariable String email) {
        return new ResponseEntity<String>(accountService.deleteAccount(email), HttpStatus.OK);
    }

}
