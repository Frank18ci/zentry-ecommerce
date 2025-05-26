package com.zentry.api.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.zentry.api.dto.TallaDTO;



public interface TallaService {
	//
	public List<TallaDTO> list();
	public Page<TallaDTO> listFiltro(int page, int size, String direction, String nombre);
	public TallaDTO findById(Long id);
	//public TallaDTO findByAll(Long id);
	public TallaDTO save(TallaDTO tallaDTO);
	public TallaDTO update(TallaDTO tallaDTO);
	public String delete(Long id);
}
