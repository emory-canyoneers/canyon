package com.canyoneers.canyon.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;

    public String toJson() {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\", \"returnSecureToken\": true}";
    }
}
