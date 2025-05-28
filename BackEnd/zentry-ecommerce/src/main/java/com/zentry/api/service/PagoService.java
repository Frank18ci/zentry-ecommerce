package com.zentry.api.service;

import com.zentry.api.dto.OrdenDto;
import com.zentry.api.dto.PagoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PagoService {
    public List<PagoDto> list();
    public Page<PagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario);
    public PagoDto findById(Long id);
    public PagoDto save(PagoDto pagoDto);
    public PagoDto update(PagoDto pagoDto);
    public String deleteById(Long id);
}
