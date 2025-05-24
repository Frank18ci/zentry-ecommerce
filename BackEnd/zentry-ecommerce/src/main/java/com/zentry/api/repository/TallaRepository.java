package com.zentry.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zentry.api.model.Talla;

public interface TallaRepository extends JpaRepository<Talla, Long> {
	 Optional<Talla> findByNombre(String nombre);
}
