package com.zentry.api.repository;

import com.zentry.api.model.EstadoOrden;
import com.zentry.api.model.SubCategoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoriaRepository extends JpaRepository<SubCategoria, Long> {
    Page<SubCategoria> findByNombreContaining(String nombre, Pageable pageable);
}
