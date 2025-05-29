package com.zentry.api.service;

import com.zentry.api.dto.OrdenItemDto;
import com.zentry.api.dto.RolDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RolService {
    public List<RolDto> list();
    public Page<RolDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public RolDto findById(Long id);
    public RolDto save(RolDto rolDto);
    public RolDto update(RolDto rolDto);
    public String deleteById(Long id);
}
