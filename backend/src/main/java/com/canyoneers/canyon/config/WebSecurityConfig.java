package com.canyoneers.canyon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(
                        requests -> requests
                                .requestMatchers("/auth").permitAll()
                                .requestMatchers(HttpMethod.POST, "/users").permitAll()
                                .requestMatchers("/", "index.html", "AboutUs.html", "HowTo.html", "Group 9.svg",
                                        "nav.html", "logo1.png", "Vector.png", "/static/**", "/HeadShots/**",
                                        "/scripts/**", "/styles/**", "GetStarted.html", "expo-code.png")
                                .permitAll()
                                .anyRequest().authenticated());

        http
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}
