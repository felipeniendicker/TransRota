package com.transrota.backend.dto;

import com.transrota.backend.enums.PerfilUsuario;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Dados para cadastro ou atualizacao de usuario")
public class UsuarioRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Schema(description = "Nome completo do usuario", example = "Ana Souza")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Schema(description = "Email de acesso", example = "chefe@transrota.com")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Schema(description = "Senha de acesso", example = "123456")
    private String senha;

    @NotNull(message = "Perfil é obrigatório")
    @Schema(description = "Perfil de acesso", example = "CHEFE")
    private PerfilUsuario perfil;

    @NotNull(message = "Ativo é obrigatório")
    @Schema(description = "Indica se o usuario esta ativo", example = "true")
    private Boolean ativo;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public PerfilUsuario getPerfil() {
        return perfil;
    }

    public void setPerfil(PerfilUsuario perfil) {
        this.perfil = perfil;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
