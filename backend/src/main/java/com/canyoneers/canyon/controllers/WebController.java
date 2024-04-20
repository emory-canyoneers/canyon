package com.canyoneers.canyon.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class WebController {
    
    @GetMapping("/Home")
    public String home() {
        return "Home.html";
    }
    
}
