package com.transrota.backend.service;

import com.transrota.backend.dto.VeiculoRequestDTO;
import com.transrota.backend.dto.VeiculoResponseDTO;
import com.transrota.backend.entity.Veiculo;
import com.transrota.backend.repository.VeiculoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VeiculoService {

    private static final Logger log = LoggerFactory.getLogger(VeiculoService.class);

    private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    public VeiculoResponseDTO salvar(VeiculoRequestDTO dto) {
        if (veiculoRepository.existsByPlaca(dto.getPlaca())) {
            log.warn("event=veiculo_create_rejected reason=placa_duplicada placa={}", dto.getPlaca());
            return null;
        }

        Veiculo veiculo = new Veiculo();
        veiculo.setPlaca(dto.getPlaca());
        veiculo.setModelo(dto.getModelo());
        veiculo.setMarca(dto.getMarca());
        veiculo.setAno(dto.getAno());
        veiculo.setCategoria(dto.getCategoria());
        veiculo.setCapacidadeKg(dto.getCapacidadeKg());
        veiculo.setStatus(dto.getStatus());
        veiculo.setAtivo(dto.getAtivo());

        Veiculo veiculoSalvo = veiculoRepository.save(veiculo);
        log.info("event=veiculo_created veiculoId={} placa={} status={}",
                veiculoSalvo.getId(), veiculoSalvo.getPlaca(), veiculoSalvo.getStatus());

        return converterParaResponseDTO(veiculoSalvo);
    }

    public List<VeiculoResponseDTO> listarTodos() {
        List<VeiculoResponseDTO> veiculos = veiculoRepository.findByAtivoTrue()
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
        log.info("event=veiculo_list count={}", veiculos.size());
        return veiculos;
    }

    public VeiculoResponseDTO buscarPorId(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id).orElse(null);

        if (veiculo == null) {
            log.warn("event=veiculo_not_found veiculoId={}", id);
            return null;
        }

        return converterParaResponseDTO(veiculo);
    }

    public VeiculoResponseDTO atualizar(Long id, VeiculoRequestDTO dto) {
        Veiculo veiculo = veiculoRepository.findById(id).orElse(null);

        if (veiculo == null) {
            log.warn("event=veiculo_update_rejected reason=not_found veiculoId={}", id);
            return null;
        }

        if (!veiculo.getPlaca().equals(dto.getPlaca()) && veiculoRepository.existsByPlaca(dto.getPlaca())) {
            log.warn("event=veiculo_update_rejected reason=placa_duplicada veiculoId={} placa={}", id, dto.getPlaca());
            return null;
        }

        veiculo.setPlaca(dto.getPlaca());
        veiculo.setModelo(dto.getModelo());
        veiculo.setMarca(dto.getMarca());
        veiculo.setAno(dto.getAno());
        veiculo.setCategoria(dto.getCategoria());
        veiculo.setCapacidadeKg(dto.getCapacidadeKg());
        veiculo.setStatus(dto.getStatus());
        veiculo.setAtivo(dto.getAtivo());

        Veiculo veiculoAtualizado = veiculoRepository.save(veiculo);
        log.info("event=veiculo_updated veiculoId={} placa={} status={}",
                veiculoAtualizado.getId(), veiculoAtualizado.getPlaca(), veiculoAtualizado.getStatus());

        return converterParaResponseDTO(veiculoAtualizado);
    }

    public void deletar(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id).orElse(null);

        if (veiculo != null) {
            veiculo.setAtivo(false);
            veiculoRepository.save(veiculo);
            log.info("event=veiculo_deactivated veiculoId={} placa={}", veiculo.getId(), veiculo.getPlaca());
        } else {
            log.warn("event=veiculo_deactivate_ignored reason=not_found veiculoId={}", id);
        }
    }

    private VeiculoResponseDTO converterParaResponseDTO(Veiculo veiculo) {
        VeiculoResponseDTO dto = new VeiculoResponseDTO();
        dto.setId(veiculo.getId());
        dto.setPlaca(veiculo.getPlaca());
        dto.setModelo(veiculo.getModelo());
        dto.setMarca(veiculo.getMarca());
        dto.setAno(veiculo.getAno());
        dto.setCategoria(veiculo.getCategoria());
        dto.setCapacidadeKg(veiculo.getCapacidadeKg());
        dto.setStatus(veiculo.getStatus());
        dto.setAtivo(veiculo.getAtivo());
        return dto;
    }
}
