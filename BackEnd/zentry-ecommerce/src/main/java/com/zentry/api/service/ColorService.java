package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.ColorDTO;


public interface ColorService {
	public List<ColorDTO> list();
	public Page<ColorDTO> listFiltro(int page, int size, String direction, String nombre);
	public ColorDTO findById(Long id);
	//public ColorDTO findByAll(Long id);
	public ColorDTO save(ColorDTO colorDTO);
	public ColorDTO update(ColorDTO colorDTO);
	public String delete(Long id);
	
	//
	
}
