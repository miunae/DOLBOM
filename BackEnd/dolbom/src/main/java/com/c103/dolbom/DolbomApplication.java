package com.c103.dolbom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DolbomApplication {
	public static void main(String[] args) {
		SpringApplication.run(DolbomApplication.class, args);
	}

}
