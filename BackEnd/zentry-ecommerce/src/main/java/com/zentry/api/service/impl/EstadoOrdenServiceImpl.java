package com.zentry.api.service.impl;

import java.util.List;

import com.zentry.api.model.Orden;
import com.zentry.api.service.OrdenService;
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
        return EstadoOrdenDto.listEstadoOrdenToListEstadoOrdenDto(estadoOrdenRepository.findAll());
	}

	@Override
	public Page<EstadoOrdenDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
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

	private final OrdenService ordenService;

	@Override
	public String deleteById(Long id) {
		if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }

		EstadoOrden estadoOrden = estadoOrdenRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Estado Orden no encontrado con id" + id));

		for(Orden orden : estadoOrden.getOrdenes()){
			ordenService.deleteById(orden.getId());
		}

        estadoOrdenRepository.deleteById(id);
        return "Estado Orden con id " + id + " eliminado";
	}
	
	
}
