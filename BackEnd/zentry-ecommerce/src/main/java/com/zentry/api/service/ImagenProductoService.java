package com.zentry.api.service;

import com.zentry.api.dto.EstadoOrdenDto;
import com.zentry.api.dto.ImagenProductoDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ImagenProductoService {
    public List<ImagenProductoDto> list();
    public Page<ImagenProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreProducto);
    public ImagenProductoDto findById(Long id);
    public ImagenProductoDto save(ImagenProductoDto imagenProductoDto);
    public ImagenProductoDto update(ImagenProductoDto imagenProductoDto);
    public String deleteById(Long id);
}
