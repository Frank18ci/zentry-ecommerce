package com.zentry.api.service;

import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.DireccionDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DireccionService {
    public List<DireccionDto> list();
    public Page<DireccionDto> listFiltro(int page, int size, String sortBy, String direction, String direccion);
    public DireccionDto findById(Long id);
    public DireccionDto save(DireccionDto direccionDto);
    public DireccionDto update(DireccionDto direccionDto);
    public String deleteById(Long id);
}
