package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.model.Producto;

public interface ProductoService {
	public List<Producto> list();
	public Page<Producto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
	public Producto findById(Long id);
}
