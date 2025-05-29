package com.zentry.api.repository;

import com.zentry.api.model.EstadoOrden;
import com.zentry.api.model.OrdenItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {
    Page<OrdenItem> findByOrden_Usuario_NombreContaining(String nombre, Pageable pageable);
}
