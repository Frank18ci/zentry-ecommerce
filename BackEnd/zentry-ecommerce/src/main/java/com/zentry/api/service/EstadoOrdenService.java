package com.zentry.api.service;

import com.zentry.api.dto.EstadoOrdenDto;
import com.zentry.api.dto.OrdenDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EstadoOrdenService {
    public List<EstadoOrdenDto> list();
    public Page<EstadoOrdenDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public EstadoOrdenDto findById(Long id);
    public EstadoOrdenDto save(EstadoOrdenDto estadoOrdenDto);
    public EstadoOrdenDto update(EstadoOrdenDto estadoOrdenDto);
    public String deleteById(Long id);
}
