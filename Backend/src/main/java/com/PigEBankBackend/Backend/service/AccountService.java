package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.repository.AccountRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> findAccountByUsername(String username) {
        return accountRepository.findAccountByUsername(username);
    }

    public Account addAccount(Account account) {
        account.setId(new ObjectId());
        return accountRepository.save(account);
    }

    public String deleteAccount(String username) {
        accountRepository.deleteById(findAccountByUsername(username).get().getId());
        return username + " was deleted";
    }

    public Account updateAccountAll(Account account) {
        Account currentAccount = accountRepository.findById(account.getId()).get();
        currentAccount.setUsername(account.getUsername());
        currentAccount.setFirstName(account.getFirstName());
        currentAccount.setLastName(account.getLastName());
        currentAccount.setPassword(account.getPassword());
        currentAccount.setNumOfGoals(account.getNumOfGoals());
        return accountRepository.save(currentAccount);
    }

    public Account updateAccountPassword(Account account) {
        Account currentAccount = accountRepository.findById(account.getId()).get();
        currentAccount.setPassword(account.getPassword());
        return accountRepository.save(currentAccount);
    }

    public Account updateNumOfGoals(Account account) {
        Account currentAccount = accountRepository.findById(account.getId()).get();
        currentAccount.setNumOfGoals(account.getNumOfGoals());
        return accountRepository.save(currentAccount);
    }
}
