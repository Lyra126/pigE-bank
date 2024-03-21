package com.PigEBankBackend.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "securityQs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecurityQs {
    @Id
    private ObjectId id;

    private int associatedNum;
    private String question;
}
