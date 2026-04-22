package com.transrota.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Schema(description = "Dados para cadastro ou atualizacao de manutencao")
public class ManutencaoRequestDTO {

    @NotNull(message = "Veículo é obrigatório")
    @Schema(description = "Identificador do veiculo vinculado", example = "1")
    private Long veiculoId;

    @NotBlank(message = "Descrição é obrigatória")
    @Schema(description = "Descricao do servico ou problema", example = "Revisao do sistema de freios")
    private String descricao;

    @NotNull(message = "Data de abertura é obrigatória")
    @Schema(description = "Data de abertura da manutencao", example = "2026-04-22")
    private LocalDate dataAbertura;

    @NotBlank(message = "Status é obrigatório")
    @Schema(description = "Status da manutencao", example = "ABERTA")
    private String status;

    @Schema(description = "Observacao operacional", example = "Aguardando avaliacao tecnica")
    private String observacao;

    @NotNull(message = "Ativo é obrigatório")
    @Schema(description = "Indica se a manutencao esta ativa", example = "true")
    private Boolean ativo;

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDate dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
