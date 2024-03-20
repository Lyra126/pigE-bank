package com.PigEBankBackend.Backend.repository;

import com.PigEBankBackend.Backend.model.SecurityQs;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  SecurityQsRepository extends MongoRepository<SecurityQs, ObjectId>{
}
