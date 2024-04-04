package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.Account;
import com.PigEBankBackend.Backend.model.Goal;
import com.PigEBankBackend.Backend.repository.GoalRepository;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.awt.*;
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

    public String getGoalId(String pigName, String ownerEmail) {
        Query query = new Query();
        query.addCriteria(Criteria.where("pigName").is(pigName));
        query.addCriteria(Criteria.where("ownerEmail").is(ownerEmail));

        List<Goal> foundGoal = mongoTemplate.find(query, Goal.class);

        if(!foundGoal.isEmpty()) {
            return foundGoal.get(0).getId().toString();
        }

        return "Goal not found";
    }

    public String addGoal(Goal goal) {
        //find the account first and check if they have 11 goals or less so they can add one
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(goal.getOwnerEmail()));

        List<Account> accountList = mongoTemplate.find(query, Account.class);
        Account account = accountList.get(0);
        if(account.getNumOfGoals() > 12){
            return "At max number of goals >:(";
        }

        //Create the goal
        goal.setId(new ObjectId());
        goal.setCreation(LocalDate.now());
        goal.setCurrentSavings(0);
        goal.setStage(1);

        //Update Account (Each goal must be associated w/ and account)
        Update update = new Update().push("goalsID").value(goal.getId());
        mongoTemplate.updateFirst(query, update, Account.class);


        //increment the number of goals in the account
        Update updateNumOfGoals = new Update().set("numOfGoals", account.getNumOfGoals() + 1);
        UpdateResult updateResultNumOfGoals = mongoTemplate.updateFirst(query, updateNumOfGoals, Account.class);

        goalRepository.save(goal);

        return "Increment numOfGoals: " + updateResultNumOfGoals;
    }

    public String deleteGoal(String id){
        Query findGoal = new Query();
        findGoal.addCriteria(Criteria.where("id").is(id));
        Goal goal = mongoTemplate.find(findGoal, Goal.class).getFirst();

        //first dec count of owner account
        Query findAccount = new Query();
        findAccount.addCriteria(Criteria.where("email").is(goal.getOwnerEmail()));

        Account account = mongoTemplate.find(findAccount, Account.class).getFirst();
        Update decNumOfGoals = new Update().set("numOfGoals", account.getNumOfGoals() - 1);
        UpdateResult decNumOfGoalsResult = mongoTemplate.updateFirst(findAccount, decNumOfGoals, Account.class);

        //remove goal from account list
        Update removeFromAccountList = new Update().pull("goalsID", goal.getId());
        UpdateResult removeFromAccountListResult = mongoTemplate.updateFirst(findAccount, removeFromAccountList, Account.class);

        //delete the goal
        DeleteResult deleteResult = mongoTemplate.remove(findGoal, Goal.class);

        return "decNumOfGoals: " + decNumOfGoalsResult + "\nremoveFromAccountList: " + removeFromAccountListResult + "\ndeleteGoal: " +deleteResult;
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

    public String addToCurrentSavings(String id, int money){
        Query findGoal = new Query();
        findGoal.addCriteria(Criteria.where("id").is(id));

        UpdateResult updateGoalResult;
        UpdateResult updateAccountResult;
        Goal goal = mongoTemplate.find(findGoal, Goal.class).getFirst();

        if(goal != null) {
            Update updateGoal = new Update().set("currentSavings", goal.getCurrentSavings() + money);
            int completion = (goal.getCurrentSavings() + money)*100/goal.getSavingsGoal();
            int stage;
            if(completion < 25){
                stage = 0;
            } else if(completion < 50){
                stage = 1;
            } else if(completion < 75){
                stage = 2;
            } else {
                stage = 3;
            }
            updateGoal.set("stage", stage);
            updateGoalResult = mongoTemplate.updateFirst(findGoal, updateGoal, Goal.class);




            Query findAccount = new Query();
            findAccount.addCriteria(Criteria.where("email").is(goal.getOwnerEmail()));
            List<Account> user = mongoTemplate.find(findAccount, Account.class);

            if (!user.isEmpty()) {
                Update updateAccount = new Update().set("totalSavings", user.get(0).getTotalSavings() + money);
                updateAccountResult = mongoTemplate.updateFirst(findAccount, updateAccount, Account.class);
                return "addToGoal: " + updateGoalResult +"\naddToAccount: " + updateAccountResult;
            }
            return "addToGoal: " + updateGoalResult +"\naddToAccount: No Account Found";
        }

        return "addToGoal: No Goal Found";

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
