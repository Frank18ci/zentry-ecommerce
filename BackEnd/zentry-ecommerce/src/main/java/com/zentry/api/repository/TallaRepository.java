package com.zentry.api.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.zentry.api.model.Talla;

import java.util.Optional;

public interface TallaRepository extends JpaRepository<Talla, Long> {
	Page<Talla> findByNombreContaining(String nombre, Pageable pageable);
	Optional<Talla> findTallaById(Long id);
}
