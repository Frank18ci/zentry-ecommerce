package com.zentry.api.repository;

import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.ImagenProducto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenProductoRepository extends JpaRepository<ImagenProducto, Long> {
    Page<ImagenProducto> findByProducto_NombreContaining(String nombre, Pageable pageable);
}
