package com.canyoneers.canyon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.UserRepository;

@SpringBootApplication
public class CanyonApplication implements CommandLineRunner {

	@Autowired
	UserRepository users;

	@Autowired
	GroupRepository groups;

	@Override
	public void run(String... args) throws Exception {
		// initialization test code goes here
	}

	public static void main(String[] args) {
		SpringApplication.run(CanyonApplication.class, args);
	}

}
