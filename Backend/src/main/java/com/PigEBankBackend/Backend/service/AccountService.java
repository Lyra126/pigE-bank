package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.repository.AccountRepository;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> findAccountByUsername(String username) {
        return accountRepository.findAccountByUsername(username);
    }

    public ObjectId getAccountID(String username) {
        Account current = accountRepository.findAccountByUsername(username).get();
        return current.getId();
    }

    public String getAccountFullName(String username) {
        Account current = accountRepository.findAccountByUsername(username).get();
        return current.getFirstName() + " " + current.getLastName();
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

    public String updateAccountPassword(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(account.getUsername()));

        Update update = new Update().set("password", account.getPassword());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated Password: " + updateResult.getMatchedCount();
    }

    public String updateAccountNumOfGoals(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(account.getUsername()));

        Update update = new Update().set("numOfGoals", account.getNumOfGoals());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated NumOfGoals: " + updateResult.getMatchedCount();
    }

    public String updateAccountFirstName(Account account) {

        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(account.getUsername()));

        Update update = new Update().set("firstName", account.getFirstName());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);

        return "Updated firstName: " + updateResult.getMatchedCount();
    }
}
