package com.cisbaf.API_CanalDenuncias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ApiCanalDenunciasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiCanalDenunciasApplication.class, args);
	}

}
