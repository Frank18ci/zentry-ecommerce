package com.zentry.api.service.impl;

import com.zentry.api.dto.MetodoPagoDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.MetodoPago;
import com.zentry.api.repository.MetodoPagoRepository;
import com.zentry.api.service.MetodoPagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetodoPagoServiceImpl implements MetodoPagoService {
    private final MetodoPagoRepository metodoPagoRepository;

    @Override
    public List<MetodoPagoDto> list() {
    	return MetodoPagoDto.listMetodoPagoToListMetodoPagoDto(metodoPagoRepository.findAll());
    }

    @Override
    public Page<MetodoPagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
    	Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<MetodoPago> metodosPago = metodoPagoRepository.findByNombreContaining(nombre, pageable);
        return  metodosPago.map(MetodoPagoDto::metodoPagoToMetadoPagoDto);
    }

    @Override
    public MetodoPagoDto findById(Long id) {
    	return MetodoPagoDto.metodoPagoToMetadoPagoDto(metodoPagoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Metodo Pago no encontrado con id" + id)));
	
    }

    @Override
    public MetodoPagoDto save(MetodoPagoDto metodoPagoDto) {
    	MetodoPago metodoPago = MetodoPagoDto.metodoPagoDtoToMetadoPago(metodoPagoDto);
		MetodoPago metodoPagoCreated = metodoPagoRepository.save(metodoPago);
		return MetodoPagoDto.metodoPagoToMetadoPagoDto(metodoPagoCreated);
    }

    @Override
    public MetodoPagoDto update(MetodoPagoDto metodoPagoDto) {
    	MetodoPago metodoPago = metodoPagoRepository.findById(metodoPagoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Estado Pago no encontrado con id" + metodoPagoDto.getId()));
        metodoPago.setNombre(metodoPagoDto.getNombre());
        MetodoPago metodoPagoUpdated = metodoPagoRepository.save(metodoPago);
        return MetodoPagoDto.metodoPagoToMetadoPagoDto(metodoPagoUpdated);
    }

    @Override
    public String delete(Long id) {
    	if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        metodoPagoRepository.deleteById(id);
        return "Estado Pago con id " + id + " eliminado";
    }
}
