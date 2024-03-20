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

    private Account findAccount(String email){
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(email));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);

        return user.getFirst();
    }

    private List<Account> findAccountList(String email){
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(email));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);

        return user;
    }
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

    public List<Goal> getAllGoals(String email) {
        List<Account> user = findAccountList(email);

        List<Goal> goals = new ArrayList<>();
        for(int i = 0; i < user.get(0).getGoalsID().size(); i++) {
            //Find the goals associated with the account
            Query findGoal = new Query();
            findGoal.addCriteria(Criteria.where("id").is(user.get(0).getGoalsID().get(i)));
            List<Goal> foundGoal = mongoTemplate.find(findGoal, Goal.class);

            if(foundGoal.isEmpty()) {
                //This goal doesn't exist for some reason, delete it
                List<ObjectId> goalIds = user.getFirst().getGoalsID();
                goalIds.remove(i);

                user.getFirst().setNumOfGoals(goalIds.size());
                user.getFirst().setGoalsID(goalIds);
                accountRepository.save(user.getFirst());
            } else {
                goals.add(foundGoal.getFirst());
            }

        }
        return goals;
    }

    public List<Integer> getSecurityQs(String email) {
        Account current = findAccount(email);

        List<Integer> questions = new ArrayList<>();

        if(current.getSecurityQA() != null) {
            for (int i = 0; i < current.getSecurityQA().size(); i += 2) {
                questions.add(Integer.valueOf(current.getSecurityQA().get(i)));
            }
        }

        return questions;
    }

    public List<String> getSecurityAs(String email) {
        Account current = findAccount(email);

        List<String> answers = new ArrayList<>();

        if(current.getSecurityQA() != null) {
            for(int i = 1; i < current.getSecurityQA().size(); i+=2) {
                answers.add(current.getSecurityQA().get(i));
            }
        }

        return answers;
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

    public String updateSecurityQA(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("securityQA", account.getSecurityQA());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated NumOfGoals: " + updateResult.getMatchedCount();
    }

    public String replaceSecurityQA(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("securityQA", account.getSecurityQA());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Account.class);
        return "Updated NumOfGoals: " + updateResult.getMatchedCount();
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
