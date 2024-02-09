package com.PigEBankBackend.Backend.controller;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/newAccounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return new ResponseEntity<List<Account>>(accountService.getAllAccounts(), HttpStatus.OK);
    }


}
