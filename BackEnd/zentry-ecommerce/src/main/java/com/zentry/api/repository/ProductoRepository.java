package com.zentry.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zentry.api.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{
	Page<Producto> findProductoByNombreContaining(String nombre, Pageable pageable);
	Page<Producto> findProductoByNombreContainingAndSubCategoria_Id(String nombre, Long subcategoriaId, Pageable pageable);
	Page<Producto> findProductoByNombreContainingAndSubCategoria_Categoria_Id(String nombre, Long categoriaId, Pageable pageable);
	Page<Producto> findProductoByNombreContainingAndSubCategoria_IdAndSubCategoria_Categoria_Id(String nombre, Long subcategoriaId, Long categoriaId, Pageable pageable);
}
