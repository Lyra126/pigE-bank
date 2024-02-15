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
        query.addCriteria(Criteria.where("username").is(goal.getOwnerUsername()));

        Update update = new Update().push("goalsID").value(goal.getId());
        mongoTemplate.updateFirst(query, update, Account.class);

        return goalRepository.save(goal);
    }
}
