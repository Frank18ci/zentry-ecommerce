package com.zentry.api.service.impl;

import com.zentry.api.dto.EstadoProductoDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.EstadoOrden;
import com.zentry.api.model.EstadoProducto;
import com.zentry.api.repository.EstadoProductoRepository;
import com.zentry.api.service.EstadoProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstadoProductoServiceImpl implements EstadoProductoService {
    private final EstadoProductoRepository estadoProductoRepository;

    @Override
    public List<EstadoProductoDto> list() {
        return EstadoProductoDto.listEstadoProductoToListEstadoProductoDto(estadoProductoRepository.findAll());
    }

    @Override
    public Page<EstadoProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<EstadoProducto> estadoProductos = estadoProductoRepository.findByNombreContaining(nombre, pageable);
        return estadoProductos.map(EstadoProductoDto::estadoProductoToEstadoProductoDto);
    }

    @Override
    public EstadoProductoDto findById(Long id) {
        return EstadoProductoDto.estadoProductoToEstadoProductoDto(estadoProductoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Estado Producto no encontrado con id " + id)));
    }

    @Override
    public EstadoProductoDto save(EstadoProductoDto estadoProductoDto) {
        EstadoProducto estadoProducto = EstadoProductoDto.estadoProductoDtoToEstadoProducto(estadoProductoDto);
        EstadoProducto estadoProductoSaved = estadoProductoRepository.save(estadoProducto);
        return EstadoProductoDto.estadoProductoToEstadoProductoDto(estadoProductoSaved);
    }

    @Override
    public EstadoProductoDto update(EstadoProductoDto estadoProductoDto) {
        EstadoProducto estadoProducto = estadoProductoRepository.findById(estadoProductoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Estado Producto no encontrado con id " + estadoProductoDto.getId()));

        estadoProducto.setNombre(estadoProductoDto.getNombre());

        EstadoProducto estadoProductoUpdated = estadoProductoRepository.save(estadoProducto);
        return EstadoProductoDto.estadoProductoToEstadoProductoDto(estadoProductoUpdated);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        estadoProductoRepository.deleteById(id);
        return "Estado Producto con id " + id + " eliminado";
    }
}
