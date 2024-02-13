package com.PigEBankBackend.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "goals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goals {


    @Id
    private ObjectId id;

    private String pigName;
    private int currentSavings;
    private int savingsGoal;

}
