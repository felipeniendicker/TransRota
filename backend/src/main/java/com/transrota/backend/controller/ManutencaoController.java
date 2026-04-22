package com.transrota.backend.controller;

import com.transrota.backend.dto.ManutencaoRequestDTO;
import com.transrota.backend.dto.ManutencaoResponseDTO;
import com.transrota.backend.service.ManutencaoService;
import com.transrota.backend.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/manutencoes")
@Tag(name = "Manutencoes", description = "Registro e acompanhamento de manutencoes")
public class ManutencaoController {
    private static final Logger log = LoggerFactory.getLogger(ManutencaoController.class);

    private final UsuarioService usuarioService;
    private final ManutencaoService manutencaoService;
    

    public ManutencaoController(ManutencaoService manutencaoService, UsuarioService usuarioService) {
    this.manutencaoService = manutencaoService;
    this.usuarioService = usuarioService;
}

 @PostMapping
@Operation(summary = "Cadastrar manutencao", description = "Registra uma manutencao vinculada a um veiculo existente.")
public ResponseEntity<ManutencaoResponseDTO> cadastrar(
        @Valid @RequestBody ManutencaoRequestDTO dto,
        @Parameter(description = "Perfil do usuario logado", example = "MANUTENCAO")
        @RequestHeader("perfil") String perfil) {

        log.info("event=manutencao_create_request perfil={} veiculoId={} status={}",
                perfil, dto.getVeiculoId(), dto.getStatus());

        if (!usuarioService.podeCadastrarManutencao(perfil)) {
            log.warn("event=manutencao_create_response status=403 perfil={} veiculoId={}",
                    perfil, dto.getVeiculoId());
            return ResponseEntity.status(403).build();
        }

        ManutencaoResponseDTO manutencao = manutencaoService.salvar(dto);

        if (manutencao == null) {
            log.warn("event=manutencao_create_response status=400 veiculoId={}", dto.getVeiculoId());
            return ResponseEntity.badRequest().build();
        }

        log.info("event=manutencao_create_response status=200 manutencaoId={} veiculoId={}",
                manutencao.getId(), manutencao.getVeiculoId());
        return ResponseEntity.ok(manutencao);
    }

    @GetMapping
    @Operation(summary = "Listar manutencoes", description = "Retorna as manutencoes cadastradas.")
    public ResponseEntity<List<ManutencaoResponseDTO>> listarTodos() {
        List<ManutencaoResponseDTO> manutencoes = manutencaoService.listarTodos();
        log.info("event=manutencao_list_response status=200 count={}", manutencoes.size());
        return ResponseEntity.ok(manutencoes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar manutencao por ID", description = "Consulta uma manutencao pelo identificador.")
    public ResponseEntity<ManutencaoResponseDTO> buscarPorId(@PathVariable Long id) {
        log.info("event=manutencao_get_request manutencaoId={}", id);
        ManutencaoResponseDTO manutencao = manutencaoService.buscarPorId(id);

        if (manutencao == null) {
            log.warn("event=manutencao_get_response status=404 manutencaoId={}", id);
            return ResponseEntity.notFound().build();
        }

        log.info("event=manutencao_get_response status=200 manutencaoId={}", id);
        return ResponseEntity.ok(manutencao);
    }
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar manutencao", description = "Atualiza dados e status de uma manutencao existente.")
    public ResponseEntity<ManutencaoResponseDTO> atualizar(@PathVariable Long id, @RequestBody ManutencaoRequestDTO dto) {
        log.info("event=manutencao_update_request manutencaoId={} veiculoId={} status={}",
                id, dto.getVeiculoId(), dto.getStatus());
        ManutencaoResponseDTO manutencaoAtualizada = manutencaoService.atualizar(id, dto);

        if (manutencaoAtualizada == null) {
            log.warn("event=manutencao_update_response status=404_or_400 manutencaoId={} veiculoId={}",
                    id, dto.getVeiculoId());
         return ResponseEntity.notFound().build();
        }

       log.info("event=manutencao_update_response status=200 manutencaoId={} veiculoId={}",
               manutencaoAtualizada.getId(), manutencaoAtualizada.getVeiculoId());
       return ResponseEntity.ok(manutencaoAtualizada);
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "Desativar manutencao", description = "Realiza a exclusao logica da manutencao.")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("event=manutencao_delete_request manutencaoId={}", id);
        ManutencaoResponseDTO manutencao = manutencaoService.buscarPorId(id);

        if (manutencao == null) {
            log.warn("event=manutencao_delete_response status=404 manutencaoId={}", id);
            return ResponseEntity.notFound().build();
        }

        manutencaoService.deletar(id);
        log.info("event=manutencao_delete_response status=204 manutencaoId={}", id);
        return ResponseEntity.noContent().build();
    }
}
