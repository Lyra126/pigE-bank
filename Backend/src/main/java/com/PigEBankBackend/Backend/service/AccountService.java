package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.repository.AccountRepository;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<Goal> getAllGoals(Account account) {
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(account.getEmail()));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);

        List<Goal> goals = new ArrayList<>();
        for(int i = 0; i < user.get(0).getGoalsID().size(); i++) {
            //Find the goals associated with the account
            Query findGoal = new Query();
            findGoal.addCriteria(Criteria.where("id").is(user.get(0).getGoalsID().get(i)));
            goals.add(mongoTemplate.find(findGoal, Goal.class).getFirst());
        }
        return goals;
    }

    public String updateTotalSavings(Account account) {
        //FIXME May become obsolete if the goal class updates this value instead
        //Find account with the email
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(account.getEmail()));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);

        //Get the total savings
        int totalSavings = 0;
        for(int i = 0; i < user.get(0).getGoalsID().size(); i++) {
            //Find the goals associated with the account
            Query findGoal = new Query();
            findGoal.addCriteria(Criteria.where("id").is(user.get(0).getGoalsID().get(i)));
            List<Goal> goals = mongoTemplate.find(findGoal, Goal.class);

            totalSavings += goals.getFirst().getCurrentSavings();
        }

        Update update = new Update().set("totalSavings", totalSavings);
        UpdateResult updateResult = mongoTemplate.updateFirst(findAccount, update, Account.class);

        String totalSavingsString = Integer.toString(totalSavings);
        return "Updated totalSavings: " + updateResult.getMatchedCount() + "\ntotal = "+totalSavingsString;
    }
    public Account addAccount(Account account) {
        account.setId(new ObjectId());
        account.setCreation(LocalDate.now());
        return accountRepository.save(account);
    }

    public String deleteAccount(String email) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));

        mongoTemplate.remove(query, Account.class);
        return "Account was deleted";
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
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("password", account.getPassword());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated Password: " + updateResult.getMatchedCount();
    }

    public String updateAccountNumOfGoals(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("numOfGoals", account.getNumOfGoals());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated NumOfGoals: " + updateResult.getMatchedCount();
    }

    public String updateAccountFirstName(Account account) {

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("firstName", account.getFirstName());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);

        return "Updated firstName: " + updateResult.getMatchedCount();
    }

    public String updateAccountUsername(Account account) {

        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("username", account.getUsername());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);

        return "Updated username: " + updateResult.getMatchedCount();
    }
}
