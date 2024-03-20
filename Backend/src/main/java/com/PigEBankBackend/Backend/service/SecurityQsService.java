package com.PigEBankBackend.Backend.service;

import com.PigEBankBackend.Backend.model.SecurityQs;
import com.PigEBankBackend.Backend.repository.SecurityQsRepository;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SecurityQsService {
    @Autowired
    private SecurityQsRepository securityQsRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public SecurityQs createQuestion(SecurityQs securityQs) {
        securityQs.setId(new ObjectId());
        return securityQsRepository.save(securityQs);
    }

    public String deleteQuestion(int associatedNum) {
        Query query = new Query();
        query.addCriteria(Criteria.where("associatedNum").is(associatedNum));

        DeleteResult deleteResult = mongoTemplate.remove(query, SecurityQs.class);
        return "Deleted Question: " + deleteResult;
    }

    public String updateQuestion(SecurityQs securityQs) {
        Query query = new Query();
        query.addCriteria(Criteria.where("associatedNum").is(securityQs.getAssociatedNum()));

        Update update = new Update().set("question", securityQs.getQuestion());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, SecurityQs.class);

        return "Updated Question: " + updateResult.getMatchedCount();
    }
}
