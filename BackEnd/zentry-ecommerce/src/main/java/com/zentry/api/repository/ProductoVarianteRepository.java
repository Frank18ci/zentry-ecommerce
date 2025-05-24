package com.zentry.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.zentry.api.model.ProductoVariante;

public interface ProductoVarianteRepository extends JpaRepository<ProductoVariante, Long> {
	Optional<ProductoVariante> findProductoVarianteByProductoIdAndTallaIdAndColorId(Long productoId, Long tallaId, Long colorId);

    // Buscar todas las variantes de un producto (paginado)
    Page<ProductoVariante> findProductoVarianteByProductoId(Long productoId, Pageable pageable);

    // Buscar variantes con stock mayor a cierto valor (paginado)
    Page<ProductoVariante> findProductoVarianteByStockGreaterThan(int cantidad, Pageable pageable);

    // Buscar todas las variantes (paginado)
    //Page<ProductoVariante> findProductoVariante(Pageable pageable);
}
