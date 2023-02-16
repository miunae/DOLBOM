package com.c103.dolbom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
=======
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
>>>>>>> origin/frontshelter2
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
<<<<<<< HEAD
=======


>>>>>>> origin/frontshelter2
@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class DolbomApplication {

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(DolbomApplication.class, args);
	}

}
