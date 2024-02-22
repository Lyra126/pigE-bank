package com.PigEBankBackend.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "account")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    private ObjectId id;

    private String username;
    private String firstName;
    private String lastName;
    private String email;

    //Find out how to encrypt
    private String password;
    private int numOfGoals;

    private LocalDate creation;

    private List<ObjectId> goalsID;


}
