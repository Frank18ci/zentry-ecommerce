	package com.zentry.api.repository;

import com.zentry.api.model.Color;
import com.zentry.api.model.Orden;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    Page<Orden> findByUsuario_NombreContaining(String nombre, Pageable pageable);
}
