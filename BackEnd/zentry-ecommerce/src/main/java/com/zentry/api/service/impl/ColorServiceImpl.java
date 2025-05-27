package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import com.zentry.api.excepcion.BadRequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.ColorDto;
import com.zentry.api.model.Color;
import com.zentry.api.repository.ColorRepository;

import com.zentry.api.service.ColorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

	public final ColorRepository colorRepository;
	@Override
	public List<ColorDto> list() {
		return ColorDto.listColorToListColorDto(colorRepository.findAll());
	}

	@Override
	public Page<ColorDto> listFiltro(int page, int size, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, nombre);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Color> colorPage = colorRepository.findColorByNombre(nombre, pageable);
	    return colorPage.map(ColorDto::colorToColorDto);
	}

	@Override
	public ColorDto findById(Long id) {
		return ColorDto.colorToColorDto(colorRepository.findColorById(id));
	}

	/*@Override
	public ColorDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public ColorDto save(ColorDto colorDTO) {
		Color color = ColorDto.colorDtoToColor(colorDTO);
		return ColorDto.colorToColorDto(colorRepository.save(Objects.requireNonNull(color)));
	}

	@Override
	public ColorDto update(ColorDto colorDTO) {
		if(colorDTO.getId() == null){
			throw new BadRequestParam("Falta el dato id");
		}
		Color color = ColorDto.colorDtoToColor(colorDTO);
		return ColorDto.colorToColorDto(colorRepository.save(Objects.requireNonNull(color)));
	}

	@Override
	public String delete(Long id) {
		if(id == null){
			throw new BadRequestParam("Falta el dato id");
		}
		colorRepository.deleteById(id);
		return "Color Eliminado";
	}

}
