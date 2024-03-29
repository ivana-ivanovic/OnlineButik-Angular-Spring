package com.example.onlinebutik.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@EnableWebSecurity
class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
                JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }

    @Override
    public void configure(WebSecurity webSecurity) {
        // here to set ignore, everything else will require jwt
        webSecurity.ignoring().antMatchers(
                "/users/findbyemail/",
                "/users/findall",
                "/cart/*",
                "/order/findallbyiduser/",
                "/order/otherboughtitems/",
                "/order/delete/",
                "/items/*",
                "/comment/findallbyiditem",
                "/comment/countstars"
        );
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/users/findbyemail/",
                        "/users/findall",
                        "/cart/*",
                        "/order/findallbyiduser/",
                        "/order/otherboughtitems/",
                        "/order/delete/",
                        "/items/*",
                        "/comment/findallbyiditem",
                        "/comment/countstars").permitAll()
                .mvcMatchers("/cart/updateorderedcart",
                        "/comment/insert",
                        "/order/insert",
                        "/order/update",
                        "/order/isordereditembyemalandslug",
                        "/users/insert",
                        "/users/update").authenticated()
                .mvcMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
                .and().cors()
                .and().oauth2ResourceServer().jwt();
    }
}