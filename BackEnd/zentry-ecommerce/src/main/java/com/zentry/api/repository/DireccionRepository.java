package com.zentry.api.repository;

import com.zentry.api.model.Direccion;
import com.zentry.api.model.EstadoPago;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Long> {
    Page<Direccion> findBydireccionContaining(String direccion, Pageable pageable);
}
