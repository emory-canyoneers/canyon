package com.canyoneers.canyon.dto;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class AuthDto {
    private String token;
    private ObjectId userId;
    private int expiry;
}
