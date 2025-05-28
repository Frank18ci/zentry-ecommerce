package com.zentry.api.service;

import com.zentry.api.dto.ColorDto;
import com.zentry.api.dto.EstadoPagoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EstadoPagoService {
    public List<EstadoPagoDto> list();
    public Page<EstadoPagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public EstadoPagoDto findById(Long id);
    public EstadoPagoDto save(EstadoPagoDto estadoPagoDto);
    public EstadoPagoDto update(EstadoPagoDto estadoPagoDto);
    public String delete(Long id);
}
