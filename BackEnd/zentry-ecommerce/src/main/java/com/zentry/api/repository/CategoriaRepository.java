package com.zentry.api.repository;

import com.zentry.api.model.Categoria;
import com.zentry.api.model.EstadoOrden;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Page<Categoria> findByNombreContaining(String nombre, Pageable pageable);
}
