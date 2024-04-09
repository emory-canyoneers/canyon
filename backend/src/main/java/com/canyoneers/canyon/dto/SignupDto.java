package com.canyoneers.canyon.dto;

import lombok.Data;

@Data
public class SignupDto {
    String name;
    String password;
    String email;

    public String toJson() {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\",\"returnSecureToken\":true}";
    }
}
