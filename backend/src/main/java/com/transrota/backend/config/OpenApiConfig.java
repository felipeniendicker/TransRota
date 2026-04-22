package com.transrota.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI transRotaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TransRota API")
                        .description("Documentacao dos endpoints de autenticacao, veiculos, usuarios e manutencoes.")
                        .version("1.0.0"));
    }
}
