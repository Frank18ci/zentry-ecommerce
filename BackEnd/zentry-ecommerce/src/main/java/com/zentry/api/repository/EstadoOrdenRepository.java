package com.zentry.api.repository;

import com.zentry.api.model.Color;
import com.zentry.api.model.EstadoOrden;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoOrdenRepository extends JpaRepository<EstadoOrden, Long> {
    Page<EstadoOrden> findByNombre(String nombre, Pageable pageable);
}
