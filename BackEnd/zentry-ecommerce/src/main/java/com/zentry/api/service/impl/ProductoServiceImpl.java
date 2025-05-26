package com.zentry.api.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.ProductoDto;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Producto;
import com.zentry.api.repository.ProductoRepository;
import com.zentry.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService{
	
	private final ProductoRepository productoRepository;
	
	@Override
	public List<ProductoDto> list() {
		return ProductoDto.listProductoToListProductoDto(productoRepository.findAll());
	}
	@Override
	public Page<ProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, sortBy);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Producto> pageProducto = productoRepository.findProductoByNombreContaining(nombre, pageable); 
		return pageProducto.map(ProductoDto::productoToProductoDTO);
	}
	@Override
	public ProductoDto findById(Long id) {
		return ProductoDto.productoToProductoDTO(productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Producto no encontrado con id" + id)));
	}
	
}
