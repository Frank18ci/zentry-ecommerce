package com.zentry.api.service.impl;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.EstadoOrdenDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.EstadoOrden;
import com.zentry.api.repository.EstadoOrdenRepository;
import com.zentry.api.service.EstadoOrdenService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EstadoOrdenServiceImpl implements EstadoOrdenService{
	private final EstadoOrdenRepository estadoOrdenRepository;

	@Override
	public List<EstadoOrdenDto> list() {
		// TODO Auto-generated method stub
        return EstadoOrdenDto.listEstadoOrdenToListEstadoOrdenDto(estadoOrdenRepository.findAll());
	}

	@Override
	public Page<EstadoOrdenDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
		// TODO Auto-generated method stub
		Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<EstadoOrden> estadoOrden = estadoOrdenRepository.findByNombreContaining(nombre, pageable);
        return  estadoOrden.map(EstadoOrdenDto::estadoOrdenToEstadoOrdenDto);
	}

	@Override
	public EstadoOrdenDto findById(Long id) {
		// TODO Auto-generated method stub
		return EstadoOrdenDto.estadoOrdenToEstadoOrdenDto(estadoOrdenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Estado Orden no encontrado con id" + id)));
	}

	@Override
	public EstadoOrdenDto save(EstadoOrdenDto estadoOrdenDto) {
		// TODO Auto-generated method stub
		EstadoOrden estadoOrden = EstadoOrdenDto.estadoOrdenDtoToEstadoOrden(estadoOrdenDto);
		EstadoOrden estadoOrdenCreated = estadoOrdenRepository.save(estadoOrden);
        return EstadoOrdenDto.estadoOrdenToEstadoOrdenDto(estadoOrdenCreated);
	}

	@Override
	public EstadoOrdenDto update(EstadoOrdenDto estadoOrdenDto) {
		// TODO Auto-generated method stub
		EstadoOrden estadoOrden = estadoOrdenRepository.findById(estadoOrdenDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Estado Orden no encontrado con id" + estadoOrdenDto.getId()));
        estadoOrden.setNombre(estadoOrdenDto.getNombre());
        EstadoOrden estadoOrdenUpdated = estadoOrdenRepository.save(estadoOrden);
        return EstadoOrdenDto.estadoOrdenToEstadoOrdenDto(estadoOrdenUpdated);
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        estadoOrdenRepository.deleteById(id);
        return "Estado Pago con id " + id + " eliminado";
	}
	
	
}
