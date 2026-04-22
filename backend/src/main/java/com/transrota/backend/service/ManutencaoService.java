package com.transrota.backend.service;

import com.transrota.backend.dto.ManutencaoRequestDTO;
import com.transrota.backend.dto.ManutencaoResponseDTO;
import com.transrota.backend.entity.Manutencao;
import com.transrota.backend.entity.Veiculo;
import com.transrota.backend.repository.ManutencaoRepository;
import com.transrota.backend.repository.VeiculoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManutencaoService {

    private static final Logger log = LoggerFactory.getLogger(ManutencaoService.class);

    private final ManutencaoRepository manutencaoRepository;
    private final VeiculoRepository veiculoRepository;

    public ManutencaoService(ManutencaoRepository manutencaoRepository, VeiculoRepository veiculoRepository) {
        this.manutencaoRepository = manutencaoRepository;
        this.veiculoRepository = veiculoRepository;
    }

    public ManutencaoResponseDTO salvar(ManutencaoRequestDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId()).orElse(null);

        if (veiculo == null) {
            log.warn("event=manutencao_create_rejected reason=veiculo_not_found veiculoId={}", dto.getVeiculoId());
            return null;
        }

        Manutencao manutencao = new Manutencao();
        manutencao.setVeiculo(veiculo);
        manutencao.setDescricao(dto.getDescricao());
        manutencao.setDataAbertura(dto.getDataAbertura());
        manutencao.setStatus(dto.getStatus());
        manutencao.setObservacao(dto.getObservacao());
        manutencao.setAtivo(dto.getAtivo());

        Manutencao manutencaoSalva = manutencaoRepository.save(manutencao);
        log.info("event=manutencao_created manutencaoId={} veiculoId={} status={}",
                manutencaoSalva.getId(), veiculo.getId(), manutencaoSalva.getStatus());

        return converterParaResponseDTO(manutencaoSalva);
    }

    public List<ManutencaoResponseDTO> listarTodos() {
        List<ManutencaoResponseDTO> manutencoes = manutencaoRepository.findByAtivoTrue()
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
        log.info("event=manutencao_list count={}", manutencoes.size());
        return manutencoes;
    }

    public ManutencaoResponseDTO buscarPorId(Long id) {
        Manutencao manutencao = manutencaoRepository.findById(id).orElse(null);

        if (manutencao == null) {
            log.warn("event=manutencao_not_found manutencaoId={}", id);
            return null;
        }

        return converterParaResponseDTO(manutencao);
    }

    private ManutencaoResponseDTO converterParaResponseDTO(Manutencao manutencao) {
        ManutencaoResponseDTO dto = new ManutencaoResponseDTO();

        dto.setId(manutencao.getId());
        dto.setVeiculoId(manutencao.getVeiculo().getId());
        dto.setPlacaVeiculo(manutencao.getVeiculo().getPlaca());
        dto.setDescricao(manutencao.getDescricao());
        dto.setDataAbertura(manutencao.getDataAbertura());
        dto.setStatus(manutencao.getStatus());
        dto.setObservacao(manutencao.getObservacao());
        dto.setAtivo(manutencao.getAtivo());

        return dto;
    }
    public ManutencaoResponseDTO atualizar(Long id, ManutencaoRequestDTO dto) {
        Manutencao manutencao = manutencaoRepository.findById(id).orElse(null);

        if (manutencao == null) {
            log.warn("event=manutencao_update_rejected reason=not_found manutencaoId={}", id);
            return null;
        }

        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId()).orElse(null);

        if (veiculo == null) {
            log.warn("event=manutencao_update_rejected reason=veiculo_not_found manutencaoId={} veiculoId={}",
                    id, dto.getVeiculoId());
            return null;
        }

        manutencao.setVeiculo(veiculo);
        manutencao.setDescricao(dto.getDescricao());
        manutencao.setDataAbertura(dto.getDataAbertura());
        manutencao.setStatus(dto.getStatus());
        manutencao.setObservacao(dto.getObservacao());
        manutencao.setAtivo(dto.getAtivo());

        Manutencao manutencaoAtualizada = manutencaoRepository.save(manutencao);
        log.info("event=manutencao_updated manutencaoId={} veiculoId={} status={}",
                manutencaoAtualizada.getId(), veiculo.getId(), manutencaoAtualizada.getStatus());

        return converterParaResponseDTO(manutencaoAtualizada);
    }
    public void deletar(Long id) {
        Manutencao manutencao = manutencaoRepository.findById(id).orElse(null);

        if (manutencao != null) {
            manutencao.setAtivo(false);
            manutencaoRepository.save(manutencao);
            log.info("event=manutencao_deactivated manutencaoId={} veiculoId={}",
                    manutencao.getId(), manutencao.getVeiculo().getId());
        } else {
            log.warn("event=manutencao_deactivate_ignored reason=not_found manutencaoId={}", id);
        }
    }
}
