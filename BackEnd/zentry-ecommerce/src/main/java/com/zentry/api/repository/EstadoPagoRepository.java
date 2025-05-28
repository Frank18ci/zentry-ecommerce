package com.zentry.api.repository;

import com.zentry.api.model.EstadoPago;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoPagoRepository extends JpaRepository<EstadoPago, Long> {
    Page<EstadoPago> findByNombreContaining(String nombre, Pageable pageable);
}
