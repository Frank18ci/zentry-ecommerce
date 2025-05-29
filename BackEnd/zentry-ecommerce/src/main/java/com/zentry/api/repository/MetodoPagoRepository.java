package com.zentry.api.repository;

import com.zentry.api.model.MetodoPago;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {
	Page<MetodoPago> findByNombreContaining(String nombre, Pageable pageable);
}
