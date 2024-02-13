package com.PigEBankBackend.Backend.repository;

import com.PigEBankBackend.Backend.model.Goals;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalsRepository extends MongoRepository<Goals, ObjectId> {
}
