package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;


import com.zentry.api.dto.TallaDto;

import com.zentry.api.model.Talla;

import com.zentry.api.repository.TallaRepository;
import com.zentry.api.service.TallaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TallaServiceImpl implements TallaService {
	public final TallaRepository tallaRepository;
	@Override
	public List<TallaDto> list() {
		// TODO Auto-generated method stub
		return TallaDto.listTallaToListTallaDto(tallaRepository.findAll());
	}

	@Override
	public Page<TallaDto> listFiltro(int page, int size, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, nombre);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Talla> tallaPage = tallaRepository.findByNombreContaining(nombre, pageable);
	    return tallaPage.map(TallaDto::tallaToTallaDto);
	}

	@Override
	public TallaDto findById(Long id) {
		return TallaDto.tallaToTallaDto(tallaRepository.findTallaById(id)
				.orElseThrow(() -> new ResourceNotFound("Talla no encontrada con id " + id)));
	}

	/*@Override
	public TallaDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public TallaDto save(TallaDto tallaDTO) {
		Talla talla = Objects.requireNonNull(TallaDto.tallaDtoToTalla(tallaDTO));
		return TallaDto.tallaToTallaDto(tallaRepository.save(talla));
	}

	@Override
	public TallaDto update(TallaDto tallaDTO) {
		Talla talla = tallaRepository.findTallaById(tallaDTO.getId())
				.orElseThrow(() -> new ResourceNotFound("Talla no encontrada con id " + tallaDTO.getId()));
		talla.setNombre(tallaDTO.getNombre());

		return TallaDto.tallaToTallaDto(tallaRepository.save(talla));
	}

	@Override
	public String delete(Long id) {
		if(id == null){
			throw new BadRequestParam("Falta el dato id");
		}
		tallaRepository.deleteById(id);
		return "Talla Eliminado";
	}

}
