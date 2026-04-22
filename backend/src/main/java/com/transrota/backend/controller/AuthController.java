package com.transrota.backend.controller;

import com.transrota.backend.dto.ErrorResponseDTO;
import com.transrota.backend.dto.LoginRequestDTO;
import com.transrota.backend.dto.LoginResponseDTO;
import com.transrota.backend.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticacao", description = "Endpoints de login do sistema")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

@PostMapping("/login")
@Operation(summary = "Realizar login", description = "Valida email e senha e retorna os dados basicos do usuario autenticado.")
public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO dto) {
    log.info("event=auth_login_request email={}", dto.getEmail());
    LoginResponseDTO response = usuarioService.login(dto);

    if (response == null) {
        log.warn("event=auth_login_response status=401 email={}", dto.getEmail());
        ErrorResponseDTO error = new ErrorResponseDTO(
                "AUTH_ERROR",
                "Credenciais inválidas",
                List.of()
        );

        return ResponseEntity.status(401).body(error);
    }

    log.info("event=auth_login_response status=200 usuarioId={} perfil={}", response.getId(), response.getPerfil());
    return ResponseEntity.ok(response);
    }
}
