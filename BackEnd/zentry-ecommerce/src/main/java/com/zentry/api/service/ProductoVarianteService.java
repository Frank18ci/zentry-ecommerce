package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.ProductoVarianteDto;

public interface ProductoVarianteService {

	public List<ProductoVarianteDto> list();
	public Page<ProductoVarianteDto> listFiltro(int page, int size, String sortBy, String direction, String producto);
	public ProductoVarianteDto findById(Long id);
	//public ProductoVarianteDTO findByAll(Long id);
	public ProductoVarianteDto save(ProductoVarianteDto productoVarianteDTO);
	public ProductoVarianteDto update(ProductoVarianteDto productoVarianteDTO);
	public String delete(Long id);

}
