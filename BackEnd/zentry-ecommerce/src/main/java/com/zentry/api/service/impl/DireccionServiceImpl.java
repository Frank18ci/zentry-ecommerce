package com.zentry.api.service.impl;

import com.zentry.api.dto.DireccionDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Direccion;
import com.zentry.api.repository.DireccionRepository;
import com.zentry.api.service.DireccionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DireccionServiceImpl implements DireccionService {
    private final DireccionRepository direccionRepository;

    @Override
    public List<DireccionDto> list() {
        return DireccionDto.listDireccionToListDireccionDto(direccionRepository.findAll());
    }

    @Override
    public Page<DireccionDto> listFiltro(int page, int size, String sortBy, String direction, String direccion) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Direccion> direccions = direccionRepository.findBydireccionContaining(direccion, pageable);
        return direccions.map(DireccionDto::direccionToDireccionDto);
    }

    @Override
    public DireccionDto findById(Long id) {
        return DireccionDto.direccionToDireccionDto(direccionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Direccion no encontrado con id " + id)));
    }

    @Override
    public DireccionDto save(DireccionDto direccionDto) {
        Direccion direccion = DireccionDto.direccionDtoToDireccion(direccionDto);
        Direccion direccionSaved = direccionRepository.save(direccion);
        return DireccionDto.direccionToDireccionDto(direccionSaved);
    }

    @Override
    public DireccionDto update(DireccionDto direccionDto) {
        Direccion direccion = direccionRepository.findById(direccionDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Direccion no encontrado con id " + direccionDto.getDireccion()));

        direccion.setDireccion(direccionDto.getDireccion());
        direccion.setCiudad(direccionDto.getCiudad());
        direccion.setProvincia(direccionDto.getProvincia());
        direccion.setCodigoPostal(direccionDto.getCodigoPostal());
        direccion.setPais(direccionDto.getPais());

        Direccion direccionUpdated = direccionRepository.save(direccion);

        return DireccionDto.direccionToDireccionDto(direccionUpdated);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        direccionRepository.deleteById(id);
        return "Direccion con id " + id + " eliminado";
    }
}
