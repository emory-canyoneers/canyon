package com.canyoneers.canyon;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CanyonApplication implements CommandLineRunner {

	@Override
	public void run(String... args) throws Exception {
		// initialization test code goes here
		System.out.println("Starting server...");
	}

	// TODO: dockerfile for ec2
	public static void main(String[] args) {
		SpringApplication.run(CanyonApplication.class, args);
	}

}
