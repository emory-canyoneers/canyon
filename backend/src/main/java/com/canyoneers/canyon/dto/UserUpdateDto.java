package com.canyoneers.canyon.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    String name;
    String newPassword;
    String email;
}
