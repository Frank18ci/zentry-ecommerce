package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.ProductoVarianteDTO;
import com.zentry.api.model.Producto;

public interface ProductoVarianteService {

	public List<ProductoVarianteDTO> list();
	public Page<ProductoVarianteDTO> listFiltro(int page, int size, String direction, String producto);
	public ProductoVarianteDTO findById(Long id);
	//public ProductoVarianteDTO findByAll(Long id);
	public ProductoVarianteDTO save(ProductoVarianteDTO productoVarianteDTO);
	public ProductoVarianteDTO update(ProductoVarianteDTO productoVarianteDTO);
	public String delete(Long id);

}
