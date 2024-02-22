package com.canyoneers.canyon;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CanyonApplication implements CommandLineRunner {

	@Override
	public void run(String... args) throws Exception {
		// initialization test code goes here
	}

	public static void main(String[] args) {
		SpringApplication.run(CanyonApplication.class, args);
	}

}
