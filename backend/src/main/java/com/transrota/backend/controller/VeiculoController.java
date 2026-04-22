package com.transrota.backend.controller;

import com.transrota.backend.dto.VeiculoRequestDTO;
import com.transrota.backend.dto.VeiculoResponseDTO;
import com.transrota.backend.service.UsuarioService;
import com.transrota.backend.service.VeiculoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
@Tag(name = "Veiculos", description = "CRUD e consulta de veiculos da frota")
public class VeiculoController {

    private static final Logger log = LoggerFactory.getLogger(VeiculoController.class);

    private final VeiculoService veiculoService;
    private final UsuarioService usuarioService;

    public VeiculoController(VeiculoService veiculoService, UsuarioService usuarioService) {
        this.veiculoService = veiculoService;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    @Operation(summary = "Cadastrar veiculo", description = "Cadastra um veiculo quando o perfil informado possuir permissao.")
    public ResponseEntity<VeiculoResponseDTO> cadastrar(
            @Valid @RequestBody VeiculoRequestDTO dto,
            @Parameter(description = "Perfil do usuario logado", example = "CHEFE")
            @RequestHeader("perfil") String perfil) {

        log.info("event=veiculo_create_request perfil={} placa={}", perfil, dto.getPlaca());

        if (!usuarioService.podeCadastrarVeiculo(perfil)) {
            log.warn("event=veiculo_create_response status=403 perfil={} placa={}", perfil, dto.getPlaca());
            return ResponseEntity.status(403).build();
        }

        VeiculoResponseDTO salvo = veiculoService.salvar(dto);

        if (salvo == null) {
            log.warn("event=veiculo_create_response status=400 placa={}", dto.getPlaca());
            return ResponseEntity.badRequest().build();
        }

        log.info("event=veiculo_create_response status=200 veiculoId={} placa={}", salvo.getId(), salvo.getPlaca());
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    @Operation(summary = "Listar veiculos", description = "Retorna os veiculos cadastrados conforme regra atual do backend.")
    public ResponseEntity<List<VeiculoResponseDTO>> listarTodos() {
        List<VeiculoResponseDTO> veiculos = veiculoService.listarTodos();
        log.info("event=veiculo_list_response status=200 count={}", veiculos.size());
        return ResponseEntity.ok(veiculos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar veiculo por ID", description = "Consulta um veiculo pelo identificador.")
    public ResponseEntity<VeiculoResponseDTO> buscarPorId(@PathVariable Long id) {
        log.info("event=veiculo_get_request veiculoId={}", id);
        VeiculoResponseDTO veiculo = veiculoService.buscarPorId(id);

        if (veiculo == null) {
            log.warn("event=veiculo_get_response status=404 veiculoId={}", id);
            return ResponseEntity.notFound().build();
        }

        log.info("event=veiculo_get_response status=200 veiculoId={}", id);
        return ResponseEntity.ok(veiculo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar veiculo", description = "Atualiza os dados de um veiculo existente.")
    public ResponseEntity<VeiculoResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody VeiculoRequestDTO dto) {

        log.info("event=veiculo_update_request veiculoId={} placa={}", id, dto.getPlaca());
        VeiculoResponseDTO atualizado = veiculoService.atualizar(id, dto);

        if (atualizado == null) {
            log.warn("event=veiculo_update_response status=404_or_400 veiculoId={} placa={}", id, dto.getPlaca());
            return ResponseEntity.notFound().build();
        }

        log.info("event=veiculo_update_response status=200 veiculoId={} placa={}", atualizado.getId(), atualizado.getPlaca());
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Desativar veiculo", description = "Realiza a exclusao logica do veiculo.")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("event=veiculo_delete_request veiculoId={}", id);
        VeiculoResponseDTO veiculo = veiculoService.buscarPorId(id);

        if (veiculo == null) {
            log.warn("event=veiculo_delete_response status=404 veiculoId={}", id);
            return ResponseEntity.notFound().build();
        }

        veiculoService.deletar(id);
        log.info("event=veiculo_delete_response status=204 veiculoId={}", id);
        return ResponseEntity.noContent().build();
    }
}
