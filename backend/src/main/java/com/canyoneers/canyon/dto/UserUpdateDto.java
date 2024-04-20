package com.canyoneers.canyon.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    String name;
    String password; // new password
    String email;
}
