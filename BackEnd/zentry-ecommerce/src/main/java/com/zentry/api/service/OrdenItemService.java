package com.zentry.api.service;

import com.zentry.api.dto.ImagenProductoDto;
import com.zentry.api.dto.OrdenItemDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrdenItemService {
    public List<OrdenItemDto> list();
    public Page<OrdenItemDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario);
    public OrdenItemDto findById(Long id);
    public OrdenItemDto save(OrdenItemDto ordenItemDto);
    public OrdenItemDto update(OrdenItemDto ordenItemDto);
    public String deleteById(Long id);
}
