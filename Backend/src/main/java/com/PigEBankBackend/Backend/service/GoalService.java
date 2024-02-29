package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.repository.GoalRepository;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GoalService {
    @Autowired
    GoalRepository goalRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal addGoal(Goal goal) {

        //Create the goal
        goal.setId(new ObjectId());
        goal.setCreation(LocalDate.now());

        //Update Account (Each goal must be associated w/ and account)
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(goal.getOwnerEmail()));

        Update update = new Update().push("goalsID").value(goal.getId());
        mongoTemplate.updateFirst(query, update, Account.class);

        List<Account> accountList = mongoTemplate.find(query, Account.class);
        Account account = accountList.get(0);

        Update updateNumOfGoals = new Update().set("numOfGoals", account.getNumOfGoals() + 1);
        UpdateResult updateResultNumOfGoals = mongoTemplate.updateFirst(query, updateNumOfGoals, Account.class);

        return goalRepository.save(goal);
    }

    public String updatePigName(Goal goal){
        //find the goal to update from its ID
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(goal.getId()));

        //update that goals pigName
        Update update = new Update().set("pigName", goal.getPigName());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Goal.class);

        //return the result of 1 for success, 0 for failure
        return "Updated pigName: " + updateResult.getMatchedCount();
    }

    public String updateGoalName(Goal goal){
        //find the goal to update from its ID
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(goal.getId()));

        //update that goals goalName
        Update update = new Update().set("goalName", goal.getGoalName());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Goal.class);

        //return the result of 1 for success, 0 for failure
        return "Updated goalName: " + updateResult.getMatchedCount();
    }


    public String updateOwnerEmail(Goal goal){
        //find the goal to update from its ID
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(goal.getId()));

        //update that goals ownerUsername
        Update update = new Update().set("ownerEmail", goal.getOwnerEmail());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Goal.class);

        //return the result of 1 for success, 0 for failure
        return "Updated ownerUsername: " + updateResult.getMatchedCount();
    }

    public String updateCurrentSavings(Goal goal){
        //find the goal to update from its ID
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(goal.getId()));

        //update that goals current savings
        Update update = new Update().set("currentSavings", goal.getCurrentSavings());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Goal.class);

        //return the result of 1 for success, 0 for failure
        return "Updated currentSavings: " + updateResult.getMatchedCount();
    }

    public String updateSavingsGoal(Goal goal){
        //find the goal to update from its ID
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(goal.getId()));

        //update that goals amount
        Update update = new Update().set("savingsGoal", goal.getSavingsGoal());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Goal.class);

        //return the result of 1 for success, 0 for failure
        return "Updated savingsGoal: " + updateResult.getMatchedCount();
    }

}
