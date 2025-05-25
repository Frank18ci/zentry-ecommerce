package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.ColorDTO;
import com.zentry.api.model.Color;
import com.zentry.api.repository.ColorRepository;

import com.zentry.api.service.ColorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

	public final ColorRepository colorRepository;
	@Override
	public List<ColorDTO> list() {
		// TODO Auto-generated method stub
		return ColorDTO.listColorToListColorDto(colorRepository.findAll());
	}

	@Override
	public Page<ColorDTO> listFiltro(int page, int size, String direction, String nombre) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, nombre);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Color> colorPage = colorRepository.findColorByNombre(nombre, pageable);
	    return colorPage.map(ColorDTO::colorToColorDto);
	}

	@Override
	public ColorDTO findById(Long id) {
		return ColorDTO.colorToColorDto(colorRepository.findColorById(id));
	}

	/*@Override
	public ColorDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public ColorDTO save(ColorDTO colorDTO) {
		Color color = ColorDTO.colorDtoToColor(colorDTO);
		return ColorDTO.colorToColorDto(colorRepository.save(Objects.requireNonNull(color)));
	}

	@Override
	public ColorDTO update(ColorDTO colorDTO) {
		Color color = ColorDTO.colorDtoToColor(colorDTO);
		return ColorDTO.colorToColorDto(colorRepository.save(Objects.requireNonNull(color)));
	}

	@Override
	public String delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
