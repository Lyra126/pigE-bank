package com.PigEBankBackend.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "goals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goal {


    @Id
    private ObjectId id;
    private String pigName;
    private String goalName;
    private String goalType;
    private int stage;
    private String ownerEmail;
    private int currentSavings;
    private int savingsGoal;
    private LocalDate creation;



}
