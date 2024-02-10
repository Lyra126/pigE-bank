package com.PigEBankBackend.Backend.repository;

import com.PigEBankBackend.Backend.model.Account;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {
    Optional<Account> findAccountByUsername(String username);
}
