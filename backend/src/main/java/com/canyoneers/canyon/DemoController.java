package com.canyoneers.canyon;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class DemoController {
    private int counter;

    @GetMapping("demo")
    public String plusOne() {
        counter++;
        return String.format("<h1>Number of visitors: %d</h1>", counter);
    }
}
