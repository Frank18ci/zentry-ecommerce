package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.ProductoDto;
import com.zentry.api.model.Producto;

public interface ProductoService {
	public List<ProductoDto> list();
	public Page<ProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre, Long idCategoria, Long idSubCategoria);
	public ProductoDto findById(Long id);
	public ProductoDto saveProducto(ProductoDto productoDto);
	public ProductoDto updateProducto(ProductoDto productoDto);
	public String deleteProductoById(Long id);
}
