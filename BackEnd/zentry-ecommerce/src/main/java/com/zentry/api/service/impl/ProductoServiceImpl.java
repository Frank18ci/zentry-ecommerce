package com.zentry.api.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.model.Producto;
import com.zentry.api.repository.ProductoRepository;
import com.zentry.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService{
	
	private final ProductoRepository productoRepository;
	
	@Override
	public List<Producto> list() {
		return productoRepository.findAll();
	}
	@Override
	public Page<Producto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, sortBy);
		Pageable pageable = PageRequest.of(page, size, sort);
		return productoRepository.findProductoByNombreContaining(nombre, pageable);
	}
	@Override
	public Producto findById(Long id) {
		return productoRepository.findById(id).orElse(new Producto());
	}
	
}
