package com.zentry.api.service;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.dto.EstadoOrdenDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoriaService {
    public List<CategoriaDto> list();
    public Page<CategoriaDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public CategoriaDto findById(Long id);
    public CategoriaDto save(CategoriaDto categoriaDto);
    public CategoriaDto update(CategoriaDto categoriaDto);
    public String deleteById(Long id);
}
