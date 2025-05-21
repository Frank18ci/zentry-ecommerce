package com.zentry.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zentry.api.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{
	Page<Producto> findProductoByNombreContaining(String nombre, Pageable pageable);
}
