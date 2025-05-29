package com.zentry.api.repository;

import com.zentry.api.model.ComentarioProducto;
import com.zentry.api.model.EstadoPago;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioProductoRepository extends JpaRepository<ComentarioProducto, Long> {
    Page<ComentarioProducto> findByUsuario_NombreContaining(String nombreUsuario, Pageable pageable);
}
