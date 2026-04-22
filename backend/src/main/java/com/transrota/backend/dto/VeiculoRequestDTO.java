package com.transrota.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Dados para cadastro ou atualizacao de veiculo")
public class VeiculoRequestDTO {

    @NotBlank(message = "Placa é obrigatória")
    @Schema(description = "Placa do veiculo", example = "ABC1D23")
    private String placa;

    @NotBlank(message = "Modelo é obrigatório")
    @Schema(description = "Modelo do veiculo", example = "Sprinter")
    private String modelo;

    @NotBlank(message = "Marca é obrigatória")
    @Schema(description = "Marca do veiculo", example = "Mercedes-Benz")
    private String marca;

    @NotNull(message = "Ano é obrigatório")
    @Schema(description = "Ano de fabricacao", example = "2022")
    private Integer ano;

    @NotBlank(message = "Categoria é obrigatória")
    @Schema(description = "Categoria operacional", example = "Van")
    private String categoria;

    @NotNull(message = "Capacidade em Kg é obrigatória")
    @Schema(description = "Capacidade em quilogramas", example = "1200")
    private Double capacidadeKg;

    @NotBlank(message = "Status é obrigatório")
    @Schema(description = "Status do veiculo", example = "DISPONIVEL")
    private String status;

    @NotNull(message = "Ativo é obrigatório")
    @Schema(description = "Indica se o veiculo esta ativo", example = "true")
    private Boolean ativo;

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Double getCapacidadeKg() {
        return capacidadeKg;
    }

    public void setCapacidadeKg(Double capacidadeKg) {
        this.capacidadeKg = capacidadeKg;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
