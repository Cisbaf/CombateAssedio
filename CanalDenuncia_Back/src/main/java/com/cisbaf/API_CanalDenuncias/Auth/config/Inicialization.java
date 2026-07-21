package com.cisbaf.API_CanalDenuncias.Auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.cisbaf.API_CanalDenuncias.Auth.model.Admin;
import com.cisbaf.API_CanalDenuncias.Auth.repository.AdminRepository;
import com.cisbaf.API_CanalDenuncias.Auth.service.AdminService;

@Component
public class Inicialization implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminService adminService;

    @Value("${ADMIN_DEFAULT_PASSWORD:admin}")
    private String adminDefaultPassword;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.findByUsername("admin").isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword(adminDefaultPassword);
            adminService.criarAdmin(admin);
        }
    }
}
