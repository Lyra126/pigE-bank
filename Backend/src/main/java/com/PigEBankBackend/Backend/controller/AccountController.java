package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Accounts")
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

    @PostMapping("/newAccount")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@RequestBody Account account) {
        return accountService.addAccount(account);
    }

    @DeleteMapping("/remove/{username}")
    public String deleteAccount(@PathVariable String username) {
        return accountService.deleteAccount(username);
    }

}
