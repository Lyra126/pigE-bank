package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.model.Login;
import com.PigEBankBackend.Backend.model.SecurityQs;
import com.PigEBankBackend.Backend.repository.AccountRepository;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import org.jasypt.encryption.StringEncryptor;

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

    @Autowired
    public EncryptionService encryptor;

    private Account findAccount(String email){
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(email));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);

        return user.get(0);
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

    public List<Account> tryLogin(Login login){
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(login.getEmail()));
        List<Account> account = mongoTemplate.find(findAccount, Account.class);


        if(account.isEmpty()){
            return null;
        }
        System.out.println(encryptor.decrypt(account.get(0).getPassword()));
        System.out.println(login.getPassword());
        System.out.println(encryptor.decrypt(account.get(0).getPassword()).equals(login.getPassword()));

        if(encryptor.decrypt(account.get(0).getPassword()).equals(login.getPassword()))
            return account;
        return null;

    }

    public List<Account> findAccountByUsername(String username) {
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("username").is(username));
        return mongoTemplate.find(findAccount, Account.class);
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

        if (user.get(0).getGoalsID() == null){
            return goals;
        }
        for(int i = 0; i < user.get(0).getGoalsID().size(); i++) {
            //Find the goals associated with the account
            Query findGoal = new Query();
            findGoal.addCriteria(Criteria.where("id").is(user.get(0).getGoalsID().get(i)));
            List<Goal> foundGoal = mongoTemplate.find(findGoal, Goal.class);

            if(foundGoal.isEmpty()) {
                //This goal doesn't exist for some reason, delete it
                List<ObjectId> goalIds = user.get(0).getGoalsID();
                goalIds.remove(i);

                user.get(0).setNumOfGoals(goalIds.size());
                user.get(0).setGoalsID(goalIds);
                accountRepository.save(user.get(0));
            } else {
                goals.add(foundGoal.get(0));
            }

        }
        return goals;
    }

    public List<String> getSecurityQs(String email) {
        Account current = findAccount(email);

        List<String> questions = new ArrayList<>();

        if(current.getSecurityQA() != null) {
            for (int i = 0; i < current.getSecurityQA().size(); i += 2) {
                questions.add(current.getSecurityQA().get(i));
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

    public List<String> getSecurityQAs(String email) {
        Account current = findAccount(email);

        List<String> all = current.getSecurityQA();

        return all;
    }

    public List<Goal> getArchivedGoals(String email) {
        List<Account> user = findAccountList(email);
        List<Goal> goals = new ArrayList<>();

        if (user.get(0).getGoalsID() == null){
            return goals;
        }
        for(int i = 0; i < user.get(0).getGoalsID().size(); i++) {
            //Find the goals associated with the account
            Query findGoal = new Query();
            findGoal.addCriteria(Criteria.where("id").is(user.get(0).getGoalsID().get(i)));
            findGoal.addCriteria(Criteria.where("archived").is(true));
            List<Goal> foundGoal = mongoTemplate.find(findGoal, Goal.class);

            if(foundGoal.isEmpty()) {
                //This goal doesn't exist for some reason, delete it
                List<ObjectId> goalIds = user.get(0).getGoalsID();
                goalIds.remove(i);

                user.get(0).setNumOfGoals(goalIds.size());
                user.get(0).setGoalsID(goalIds);
                accountRepository.save(user.get(0));
            } else {
                goals.add(foundGoal.get(0));
            }

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

            totalSavings += goals.get(0).getCurrentSavings();
        }

        Update update = new Update().set("totalSavings", totalSavings);
        UpdateResult updateResult = mongoTemplate.updateFirst(findAccount, update, Account.class);

        String totalSavingsString = Integer.toString(totalSavings);
        return "Updated totalSavings: " + updateResult.getMatchedCount() + "\ntotal = "+totalSavingsString;
    }

    public Account addAccount(Account account) {
        account.setId(new ObjectId());
        account.setCreation(LocalDate.now());
        account.setPassword(encryptor.encrypt(account.getPassword()));
        return accountRepository.save(account);
    }

    public String deleteAccount(String email) {
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(email));
        List<Account> user = mongoTemplate.find(findAccount, Account.class);
        List<ObjectId> goalIds = user.get(0).getGoalsID();

        if(!goalIds.isEmpty()) {
            for(int i = 0; i < goalIds.size(); i++) {
                Query findGoal = new Query();
                findGoal.addCriteria(Criteria.where("id").is(goalIds.get(i)));
                mongoTemplate.remove(findGoal, Goal.class);
            }
        }


        DeleteResult deleteResult =  mongoTemplate.remove(findAccount, Account.class);
        return "Account was deleted: " + deleteResult;
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
        currentAccount.setPassword(encryptor.encrypt(account.getPassword()));
        currentAccount.setNumOfGoals(account.getNumOfGoals());
        return accountRepository.save(currentAccount);
    }

    public String updateAccountPassword(Account account) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(account.getEmail()));

        Update update = new Update().set("password", encryptor.encrypt(account.getPassword()));
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
