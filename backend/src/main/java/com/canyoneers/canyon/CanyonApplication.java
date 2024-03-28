package com.canyoneers.canyon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.User;
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

		// create a test group and add 5 test users if database empty
		if (groups.findAll().size() == 0) {
			Group testGroup = new Group();
			testGroup.setName("Dev group");

			for (int i = 0; i < 2; i++) {
				User testUser = new User();
				testUser.joinGroup(testGroup);
				users.save(testUser);
			}

			groups.save(testGroup);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(CanyonApplication.class, args);
	}

}
