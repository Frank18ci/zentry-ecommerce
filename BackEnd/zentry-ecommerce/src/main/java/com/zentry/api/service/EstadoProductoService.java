package com.zentry.api.service;

import com.zentry.api.dto.DireccionDto;
import com.zentry.api.dto.EstadoProductoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EstadoProductoService {
    public List<EstadoProductoDto> list();
    public Page<EstadoProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public EstadoProductoDto findById(Long id);
    public EstadoProductoDto save(EstadoProductoDto estadoProductoDto);
    public EstadoProductoDto update(EstadoProductoDto estadoProductoDto);
    public String deleteById(Long id);
}
