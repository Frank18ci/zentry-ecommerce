package com.zentry.api.repository;

import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.EstadoProducto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoProductoRepository extends JpaRepository<EstadoProducto, Long> {
    Page<EstadoProducto> findByNombreContaining(String nombre, Pageable pageable);
}
