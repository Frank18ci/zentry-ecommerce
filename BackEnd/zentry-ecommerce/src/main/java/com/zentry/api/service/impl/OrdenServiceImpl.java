package com.zentry.api.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.EstadoOrdenDto;
import com.zentry.api.dto.OrdenDto;
import com.zentry.api.dto.UsuarioDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Orden;
import com.zentry.api.repository.OrdenRepository;
import com.zentry.api.service.OrdenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrdenServiceImpl implements OrdenService{
	private final OrdenRepository ordenRepository;
	
	@Override
	public List<OrdenDto> list() {
		// TODO Auto-generated method stub
		return OrdenDto.listOrdenToListOrdenDto(ordenRepository.findAll());
	}

	@Override
	public Page<OrdenDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario) {
		// TODO Auto-generated method stub
		Sort.Direction sortDirection = Sort.Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Sort.Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Orden> orden = ordenRepository.findByUsuario_NombreContaining(nombreUsuario, pageable);
        return orden.map(OrdenDto::ordenToOrdenDto);
	}

	@Override
	public OrdenDto findById(Long id) {
		// TODO Auto-generated method stub
		return OrdenDto.ordenToOrdenDto(ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Orden no encontrado con id" + id)));
	}

	@Override
	public OrdenDto save(OrdenDto ordenDto) {
		// TODO Auto-generated method stub
		Orden orden = OrdenDto.ordenDtoToOrden(ordenDto);
        Orden ordenCreated = ordenRepository.save(orden);
        return OrdenDto.ordenToOrdenDto(ordenCreated);
	}

	@Override
	public OrdenDto update(OrdenDto ordenDto) {
		// TODO Auto-generated method stub
		Orden orden = ordenRepository.findById(ordenDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Orden no encontrado con id" + ordenDto.getId()));
        orden.setUsuario(UsuarioDto.usuarioDtoToUsuario(ordenDto.getUsuario()));
        orden.setEstadoOrden(EstadoOrdenDto.estadoOrdenDtoToEstadoOrden(ordenDto.getEstadoOrden()));
        orden.setTotal(ordenDto.getTotal());
        orden.setFechaOrden(ordenDto.getFechaOrden());
        orden.setDireccionEnvio(ordenDto.getDireccionEnvio());
        
        Orden ordenUpdated = ordenRepository.save(orden);
        return OrdenDto.ordenToOrdenDto(ordenUpdated);
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        ordenRepository.deleteById(id);
        return "Orden con id " + id + " eliminado";
	}

}
