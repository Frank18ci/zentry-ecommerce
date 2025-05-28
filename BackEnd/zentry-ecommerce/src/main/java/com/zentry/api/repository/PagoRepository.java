package com.zentry.api.repository;

import com.zentry.api.model.EstadoOrden;
import com.zentry.api.model.Pago;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    Page<Pago> findByOrden_Usuario_Nombre(String nombre, Pageable pageable);
}
