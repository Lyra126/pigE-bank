package com.PigEBankBackend.Backend.repository;

import com.PigEBankBackend.Backend.model.Goal;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends MongoRepository<Goal, ObjectId> {
}
