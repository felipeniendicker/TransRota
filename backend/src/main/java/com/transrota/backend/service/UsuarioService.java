package com.transrota.backend.service;

import com.transrota.backend.dto.LoginRequestDTO;
import com.transrota.backend.dto.LoginResponseDTO;
import com.transrota.backend.dto.UsuarioRequestDTO;
import com.transrota.backend.dto.UsuarioResponseDTO;
import com.transrota.backend.entity.Usuario;
import com.transrota.backend.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private static final Logger log = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioResponseDTO salvar(UsuarioRequestDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            log.warn("event=usuario_create_rejected reason=email_duplicado email={}", dto.getEmail());
            return null;
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        usuario.setPerfil(dto.getPerfil());
        usuario.setAtivo(dto.getAtivo());

        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        log.info("event=usuario_created usuarioId={} email={} perfil={}",
                usuarioSalvo.getId(), usuarioSalvo.getEmail(), usuarioSalvo.getPerfil());

        return converterParaResponseDTO(usuarioSalvo);
    }

    public List<UsuarioResponseDTO> listarTodos() {
        List<UsuarioResponseDTO> usuarios = usuarioRepository.findByAtivoTrue()
            .stream()
            .map(this::converterParaResponseDTO)
            .collect(Collectors.toList());
        log.info("event=usuario_list count={}", usuarios.size());
        return usuarios;
    }

    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);

        if (usuario == null) {
            log.warn("event=usuario_not_found usuarioId={}", id);
            return null;
        }

        return converterParaResponseDTO(usuario);
    }

    private UsuarioResponseDTO converterParaResponseDTO(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setPerfil(usuario.getPerfil());
        dto.setAtivo(usuario.getAtivo());
        return dto;
    }
    
    public UsuarioResponseDTO atualizar(Long id, UsuarioRequestDTO dto) {
    Usuario usuario = usuarioRepository.findById(id).orElse(null);

    if (usuario == null) {
        log.warn("event=usuario_update_rejected reason=not_found usuarioId={}", id);
        return null;
    }

    if (!usuario.getEmail().equals(dto.getEmail()) && usuarioRepository.existsByEmail(dto.getEmail())) {
        log.warn("event=usuario_update_rejected reason=email_duplicado usuarioId={} email={}", id, dto.getEmail());
        return null;
    }

    usuario.setNome(dto.getNome());
    usuario.setEmail(dto.getEmail());
    usuario.setSenha(dto.getSenha());
    usuario.setPerfil(dto.getPerfil());
    usuario.setAtivo(dto.getAtivo());

    Usuario usuarioAtualizado = usuarioRepository.save(usuario);
    log.info("event=usuario_updated usuarioId={} email={} perfil={}",
            usuarioAtualizado.getId(), usuarioAtualizado.getEmail(), usuarioAtualizado.getPerfil());

    return converterParaResponseDTO(usuarioAtualizado);
    }

    public void deletar(Long id) {
    Usuario usuario = usuarioRepository.findById(id).orElse(null);

    if (usuario != null) {
        usuario.setAtivo(false);
        usuarioRepository.save(usuario);
        log.info("event=usuario_deactivated usuarioId={} email={}", usuario.getId(), usuario.getEmail());
    } else {
        log.warn("event=usuario_deactivate_ignored reason=not_found usuarioId={}", id);
    }
    }
    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail());

        if (usuario == null) {
            log.warn("event=login_failed reason=email_not_found email={}", dto.getEmail());
            return null;
        }

        if (!usuario.getAtivo()) {
            log.warn("event=login_failed reason=usuario_inativo usuarioId={} email={}", usuario.getId(), usuario.getEmail());
            return null;
        }

        if (!usuario.getSenha().equals(dto.getSenha())) {
            log.warn("event=login_failed reason=senha_invalida usuarioId={} email={}", usuario.getId(), usuario.getEmail());
            return null;
        }

        LoginResponseDTO response = new LoginResponseDTO();
        response.setId(usuario.getId());
        response.setNome(usuario.getNome());
        response.setEmail(usuario.getEmail());
        response.setPerfil(usuario.getPerfil());
        log.info("event=login_success usuarioId={} email={} perfil={}",
                usuario.getId(), usuario.getEmail(), usuario.getPerfil());

        return response;
    }
    public boolean isChefe(String perfil) {
        return "CHEFE".equalsIgnoreCase(perfil);
    }
    
    public boolean podeCadastrarManutencao(String perfil) {
        return "CHEFE".equalsIgnoreCase(perfil) ||
           "MANUTENCAO".equalsIgnoreCase(perfil);
    }
    public boolean podeCadastrarVeiculo(String perfil) {
        return "CHEFE".equalsIgnoreCase(perfil) ||
           "COMERCIAL".equalsIgnoreCase(perfil);
    }
}
