package com.PigEBankBackend.Backend.service;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EncryptionService {


     // Assuming it's configured and injected properly

    @Value("${env.ENCRYPTION_PASSWORD}")
    private String encryptionPassword;

    public String encrypt(String valueToEncrypt) {
        // Create a new encryptor instance and set the encryption password
        StandardPBEStringEncryptor customEncryptor = new StandardPBEStringEncryptor();


        customEncryptor.setPassword(encryptionPassword);

        // Encrypt the value using the custom encryptor
        return customEncryptor.encrypt(valueToEncrypt);
    }

    public String decrypt(String valueToEncrypt) {
        // Create a new encryptor instance and set the encryption password
        StandardPBEStringEncryptor customEncryptor = new StandardPBEStringEncryptor();


        customEncryptor.setPassword(encryptionPassword);

        // Encrypt the value using the custom encryptor
        return customEncryptor.decrypt(valueToEncrypt);
    }
}
