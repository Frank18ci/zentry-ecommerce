package com.zentry.api.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.MetodoPagoDto;
import com.zentry.api.dto.OrdenDto;
import com.zentry.api.dto.PagoDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Pago;
import com.zentry.api.repository.PagoRepository;
import com.zentry.api.service.PagoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PagoServiceImpl implements PagoService{
	private final PagoRepository pagoRepository;

	@Override
	public List<PagoDto> list() {
		// TODO Auto-generated method stub
        return PagoDto.listPagoToListPagoDto(pagoRepository.findAll());
	}

	@Override
	public Page<PagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario) {
		// TODO Auto-generated method stub
		Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Pago> pago = pagoRepository.findByOrden_Usuario_Nombre(nombreUsuario, pageable);
        return pago.map(PagoDto::pagoToPagoDto);
	}

	@Override
	public PagoDto findById(Long id) {
		// TODO Auto-generated method stub
		return PagoDto.pagoToPagoDto(pagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Pago no encontrado con id" + id)));
	}

	@Override
	public PagoDto save(PagoDto pagoDto) {
		// TODO Auto-generated method stub
		Pago pago = PagoDto.pagoDtoToPago(pagoDto);
        Pago pagoCreated = pagoRepository.save(pago);
        return PagoDto.pagoToPagoDto(pagoCreated);
	}

	@Override
	public PagoDto update(PagoDto pagoDto) {
		// TODO Auto-generated method stub
		Pago pago = pagoRepository.findById(pagoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Pago no encontrado con id" + pagoDto.getId()));
        pago.setOrden(OrdenDto.ordenDtoToOrden(pagoDto.getOrden()));
        pago.setMetodoPago(MetodoPagoDto.metodoPagoDtoToMetadoPago(pagoDto.getMetodoPago()));
        pago.setEstadoPago(EstadoPagoDto.estadoPagoDtoToEstadoPago(pagoDto.getEstadoPago()));
        pago.setMonto(pagoDto.getMonto());
        pago.setFechaPago(pagoDto.getFechaPago());
        
        Pago pagoUpdated = pagoRepository.save(pago);
        return PagoDto.pagoToPagoDto(pagoUpdated);
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		if(id == null){
			throw new BadRequestParam("Falta el dato id");
		}
		pagoRepository.deleteById(id);
		return "Producto con id " + id + " eliminado";
	}
}
