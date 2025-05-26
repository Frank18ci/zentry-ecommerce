package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;


import com.zentry.api.dto.TallaDTO;

import com.zentry.api.model.Talla;

import com.zentry.api.repository.TallaRepository;
import com.zentry.api.service.TallaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TallaServiceImpl implements TallaService {
	public final TallaRepository tallaRepository;
	@Override
	public List<TallaDTO> list() {
		// TODO Auto-generated method stub
		return TallaDTO.listTallaToListTallaDto(tallaRepository.findAll());
	}

	@Override
	public Page<TallaDTO> listFiltro(int page, int size, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, nombre);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Talla> tallaPage = tallaRepository.findByNombre(nombre, pageable);
	    return tallaPage.map(TallaDTO::tallaToTallaDto);
	}

	@Override
	public TallaDTO findById(Long id) {
		return TallaDTO.tallaToTallaDto(tallaRepository.findTallaById(id));
	}

	/*@Override
	public TallaDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public TallaDTO save(TallaDTO tallaDTO) {
		
		return TallaDTO.tallaToTallaDto(tallaRepository.save(Objects.requireNonNull(TallaDTO.tallaDtoToTalla(tallaDTO))));
	}

	@Override
	public TallaDTO update(TallaDTO tallaDTO) {
		// TODO Auto-generated method stub
		return save(tallaDTO);
	}

	@Override
	public String delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
