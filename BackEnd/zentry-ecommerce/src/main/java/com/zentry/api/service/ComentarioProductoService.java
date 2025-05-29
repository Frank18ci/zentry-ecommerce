package com.zentry.api.service;

import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.ImagenProductoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ComentarioProductoService {
    public List<ComentarioProductoDto> list();
    public Page<ComentarioProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario);
    public ComentarioProductoDto findById(Long id);
    public ComentarioProductoDto save(ComentarioProductoDto comentarioProductoDto);
    public ComentarioProductoDto update(ComentarioProductoDto comentarioProductoDto);
    public String deleteById(Long id);
}
