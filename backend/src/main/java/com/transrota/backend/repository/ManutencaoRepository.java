package com.transrota.backend.repository;

import com.transrota.backend.entity.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

    List<Manutencao> findByAtivoTrue();
}