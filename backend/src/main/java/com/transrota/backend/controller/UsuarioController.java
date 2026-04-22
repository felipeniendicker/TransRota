package com.transrota.backend.controller;

import com.transrota.backend.dto.UsuarioRequestDTO;
import com.transrota.backend.dto.UsuarioResponseDTO;
import com.transrota.backend.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "Gerenciamento de usuarios e perfis")
public class UsuarioController {

    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }



    @GetMapping
    @Operation(summary = "Listar usuarios", description = "Retorna os usuarios cadastrados.")
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        List<UsuarioResponseDTO> usuarios = usuarioService.listarTodos();
        log.info("event=usuario_list_response status=200 count={}", usuarios.size());
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuario por ID", description = "Consulta um usuario pelo identificador.")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable Long id) {
        log.info("event=usuario_get_request usuarioId={}", id);
        UsuarioResponseDTO usuario = usuarioService.buscarPorId(id);

        if (usuario == null) {
            log.warn("event=usuario_get_response status=404 usuarioId={}", id);
            return ResponseEntity.notFound().build();
        }

        log.info("event=usuario_get_response status=200 usuarioId={}", id);
        return ResponseEntity.ok(usuario);
    }
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuario", description = "Atualiza os dados de um usuario existente.")
    public ResponseEntity<UsuarioResponseDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioRequestDTO dto) {
        log.info("event=usuario_update_request usuarioId={} email={} perfil={}", id, dto.getEmail(), dto.getPerfil());
        UsuarioResponseDTO usuarioAtualizado = usuarioService.atualizar(id, dto);

        if (usuarioAtualizado == null) {
            log.warn("event=usuario_update_response status=404_or_400 usuarioId={} email={}", id, dto.getEmail());
            return ResponseEntity.notFound().build();
        }

        log.info("event=usuario_update_response status=200 usuarioId={} email={}",
                usuarioAtualizado.getId(), usuarioAtualizado.getEmail());
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Desativar usuario", description = "Realiza a exclusao logica do usuario.")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("event=usuario_delete_request usuarioId={}", id);
        UsuarioResponseDTO usuario = usuarioService.buscarPorId(id);

        if (usuario == null) {
            log.warn("event=usuario_delete_response status=404 usuarioId={}", id);
            return ResponseEntity.notFound().build();
        }

        usuarioService.deletar(id);
        log.info("event=usuario_delete_response status=204 usuarioId={}", id);
        return ResponseEntity.noContent().build();
    }
   @PostMapping
@Operation(summary = "Cadastrar usuario", description = "Cadastra um usuario quando o perfil informado for CHEFE.")
public ResponseEntity<UsuarioResponseDTO> cadastrar(
        @Valid @RequestBody UsuarioRequestDTO dto,
        @Parameter(description = "Perfil do usuario logado", example = "CHEFE")
        @RequestHeader("perfil") String perfil) {

    log.info("event=usuario_create_request perfil={} email={} novoPerfil={}", perfil, dto.getEmail(), dto.getPerfil());

    if (!usuarioService.isChefe(perfil)) {
        log.warn("event=usuario_create_response status=403 perfil={} email={}", perfil, dto.getEmail());
        return ResponseEntity.status(403).build();
    }

    UsuarioResponseDTO usuarioSalvo = usuarioService.salvar(dto);

    if (usuarioSalvo == null) {
        log.warn("event=usuario_create_response status=400 email={}", dto.getEmail());
        return ResponseEntity.badRequest().build();
    }

    log.info("event=usuario_create_response status=200 usuarioId={} email={}",
            usuarioSalvo.getId(), usuarioSalvo.getEmail());
    return ResponseEntity.ok(usuarioSalvo);
}
}
