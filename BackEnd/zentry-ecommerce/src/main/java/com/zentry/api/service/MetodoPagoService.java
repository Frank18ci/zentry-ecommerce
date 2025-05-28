package com.zentry.api.service;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.MetodoPagoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MetodoPagoService {
    public List<MetodoPagoDto> list();
    public Page<MetodoPagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public MetodoPagoDto findById(Long id);
    public MetodoPagoDto save(MetodoPagoDto metodoPagoDto);
    public MetodoPagoDto update(MetodoPagoDto metodoPagoDto);
    public String delete(Long id);
}
