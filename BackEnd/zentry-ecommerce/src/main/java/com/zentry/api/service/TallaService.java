package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.TallaDto;



public interface TallaService {
	//
	public List<TallaDto> list();
	public Page<TallaDto> listFiltro(int page, int size, String direction, String nombre);
	public TallaDto findById(Long id);
	//public TallaDTO findByAll(Long id);
	public TallaDto save(TallaDto tallaDTO);
	public TallaDto update(TallaDto tallaDTO);
	public String delete(Long id);
}
