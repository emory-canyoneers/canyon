package com.canyoneers.canyon.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class AuthDto {
    @JsonIgnore
    private String fId;
    private String token;
    private int expiry;
}
