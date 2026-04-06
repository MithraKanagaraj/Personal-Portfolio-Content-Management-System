package com.example.springapp.security;

import java.nio.charset.StandardCharsets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, ex) -> {
                    response.setStatus(401);
                    response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(buildJson(
                            401,
                            "Unauthorized",
                            "Authentication is required to access this resource",
                            request.getRequestURI()
                    ));
                })
                .accessDeniedHandler((request, response, ex) -> {
                    response.setStatus(403);
                    response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(buildJson(
                            403,
                            "Forbidden",
                            "You are not allowed to access this resource",
                            request.getRequestURI()
                    ));
                })
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**",
                    "/v3/api-docs",
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()
                .requestMatchers("/api/profile/me").authenticated()
                .requestMatchers("/api/profile/save").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/messages/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/profile/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/experiences/public/*", "/api/certifications/public/*").permitAll()
                .requestMatchers("/api/skills/**", "/api/projects/**", "/api/resume/**", "/api/messages", "/api/experiences/**", "/api/certifications/**").authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private String buildJson(int status, String error, String message, String path) {
        return "{\"status\":" + status
                + ",\"error\":\"" + escapeJson(error)
                + "\",\"message\":\"" + escapeJson(message)
                + "\",\"path\":\"" + escapeJson(path)
                + "\"}";
    }

    private String escapeJson(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
