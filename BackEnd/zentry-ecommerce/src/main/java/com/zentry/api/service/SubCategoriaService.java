package com.zentry.api.service;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.dto.SubCategoriaDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SubCategoriaService {
    public List<SubCategoriaDto> list();
    public Page<SubCategoriaDto> listFiltro(int page, int size, String sortBy, String direction, String nombre);
    public SubCategoriaDto findById(Long id);
    public SubCategoriaDto save(SubCategoriaDto subCategoriaDto);
    public SubCategoriaDto update(SubCategoriaDto subCategoriaDto);
    public String deleteById(Long id);
}
