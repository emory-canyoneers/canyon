package com.canyoneers.canyon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("Connecting security filter chain");
        http
            // this was the issue, csrf was blocking the /auth endpoint
            .csrf(csrf -> csrf.ignoringRequestMatchers("/auth"))
            .authorizeHttpRequests(
                requests -> requests
                    .requestMatchers("/auth").permitAll()
                    .anyRequest().authenticated());
        http
            .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}
