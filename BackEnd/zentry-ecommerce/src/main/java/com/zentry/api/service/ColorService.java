package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.ColorDto;


public interface ColorService {
	public List<ColorDto> list();
	public Page<ColorDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
	public ColorDto findById(Long id);
	//public ColorDTO findByAll(Long id);
	public ColorDto save(ColorDto colorDTO);
	public ColorDto update(ColorDto colorDTO);
	public String delete(Long id);
	
	//
	
}
