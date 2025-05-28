package com.zentry.api.service.impl;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.EstadoPago;
import com.zentry.api.repository.EstadoPagoRepository;
import com.zentry.api.service.EstadoPagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstadoPagoServiceImpl implements EstadoPagoService {
    private final EstadoPagoRepository estadoPagoRepository;

    @Override
    public List<EstadoPagoDto> list() {
        return EstadoPagoDto.listEstadoPagoToListEstadoPago(estadoPagoRepository.findAll());
    }

    @Override
    public Page<EstadoPagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<EstadoPago> estadoPagos = estadoPagoRepository.findByNombreContaining(nombre, pageable);
        return  estadoPagos.map(EstadoPagoDto::estadoPagoToEstadoPagoDto);
    }

    @Override
    public EstadoPagoDto findById(Long id) {
        return EstadoPagoDto.estadoPagoToEstadoPagoDto(estadoPagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Estado Pago no encontrado con id" + id)));
    }

    @Override
    public EstadoPagoDto save(EstadoPagoDto estadoPagoDto) {
        EstadoPago estadoPago = EstadoPagoDto.estadoPagoDtoToEstadoPago(estadoPagoDto);
        EstadoPago estadoPagoCreated = estadoPagoRepository.save(estadoPago);
        return EstadoPagoDto.estadoPagoToEstadoPagoDto(estadoPagoCreated);
    }

    @Override
    public EstadoPagoDto update(EstadoPagoDto estadoPagoDto) {
        EstadoPago estadoPago = estadoPagoRepository.findById(estadoPagoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Estado Pago no encontrado con id" + estadoPagoDto.getId()));
        estadoPago.setNombre(estadoPagoDto.getNombre());
        EstadoPago estadoPagoUpdated = estadoPagoRepository.save(estadoPago);
        return EstadoPagoDto.estadoPagoToEstadoPagoDto(estadoPagoUpdated);
    }

    @Override
    public String delete(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        estadoPagoRepository.deleteById(id);
        return "Estado Pago con id " + id + " eliminado";
    }
}
