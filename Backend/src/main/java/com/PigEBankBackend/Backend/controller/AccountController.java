package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Account;
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

    @PutMapping("/updateTotalSavings")
    ResponseEntity<String> updateAccountTotalSavings(@RequestBody Account account) {
        return new ResponseEntity<String>(accountService.updateTotalSavings(account), HttpStatus.OK);
    }

    @PostMapping("/newAccount")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@RequestBody Account account) {
        return accountService.addAccount(account);
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
