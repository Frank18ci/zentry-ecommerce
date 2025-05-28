package com.zentry.api.service;

import com.zentry.api.dto.OrdenDto;
import com.zentry.api.dto.ProductoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrdenService {
    public List<OrdenDto> list();
    public Page<OrdenDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario);
    public OrdenDto findById(Long id);
    public OrdenDto save(OrdenDto ordenDto);
    public OrdenDto update(OrdenDto ordenDto);
    public String deleteById(Long id);
}
