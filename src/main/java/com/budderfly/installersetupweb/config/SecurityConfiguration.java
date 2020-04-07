package com.budderfly.installersetupweb.config;

import com.budderfly.installersetupweb.config.oauth2.OAuth2JwtAccessTokenConverter;
import com.budderfly.installersetupweb.config.oauth2.OAuth2Properties;
import com.budderfly.installersetupweb.security.oauth2.OAuth2SignatureVerifierClient;
import com.budderfly.installersetupweb.security.AuthoritiesConstants;

import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.client.loadbalancer.RestTemplateCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends ResourceServerConfigurerAdapter {
    private final OAuth2Properties oAuth2Properties;

    private final CorsFilter corsFilter;

    // list of public endpoints for which authentication and CSRF should not be
    // enforced.
    private final String [] publicEndpoints = new String [] {
            "/auth/login"
    };

    public SecurityConfiguration(OAuth2Properties oAuth2Properties, CorsFilter corsFilter) {
        this.oAuth2Properties = oAuth2Properties;
        this.corsFilter = corsFilter;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
            .ignoringAntMatchers("/h2-console/**")
            .ignoringAntMatchers(publicEndpoints)
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and()
            .addFilterBefore(corsFilter, CsrfFilter.class)
            .headers()
            .frameOptions()
            .disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/info").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            .antMatchers(HttpMethod.DELETE, "/inventory/api/load-configuration-permission/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.POST, "/inventory/api/load-configuration-permission/").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/create-equipment-for-installer-permission*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/inventory-items/installer-permission/location/service-type/*/connection-type/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/equipment/monitor-details/budderfly-id/*/item-type/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.DELETE, "/inventory/api/delete-unmonitored-equipment/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.DELETE, "/inventory/api/inventory-items-permission/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.POST, "/inventory/api/inventory-items-permission*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/inventory-item-types/").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/inventory-items*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/monitors*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/known-equipment-types").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/load-configuration/ct-types").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/inventory/api/inventory-items/status/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/load-configuration/ct-setup").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/load-configuration/ct-line-phases").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers(HttpMethod.GET, "/inventory/api/load-configuration/ct-setup/inventory-item-id/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/sites/api/sites/sites-by-budderfly-id-permission/*").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/sites/api/sites/all/filtered").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/api/account").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/authenticate/api/account").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/authenticate/api/account/reset-password/init").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/authenticate/api/account/reset-password/finish").hasAnyAuthority(AuthoritiesConstants.INSTALLER)
            .antMatchers("/*/api/**").hasAnyAuthority(AuthoritiesConstants.ADMIN);
    }

    @Bean
    public TokenStore tokenStore(JwtAccessTokenConverter jwtAccessTokenConverter) {
        return new JwtTokenStore(jwtAccessTokenConverter);
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(OAuth2SignatureVerifierClient signatureVerifierClient) {
        return new OAuth2JwtAccessTokenConverter(oAuth2Properties, signatureVerifierClient);
    }

    @Bean
	@Qualifier("loadBalancedRestTemplate")
    public RestTemplate loadBalancedRestTemplate(RestTemplateCustomizer customizer) {
        RestTemplate restTemplate = new RestTemplate();
        customizer.customize(restTemplate);
        return restTemplate;
    }

    @Bean
    @Qualifier("vanillaRestTemplate")
    public RestTemplate vanillaRestTemplate() {
        return new RestTemplate();
    }
}
