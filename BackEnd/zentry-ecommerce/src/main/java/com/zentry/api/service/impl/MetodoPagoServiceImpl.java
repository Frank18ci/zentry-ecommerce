package com.zentry.api.service.impl;

import com.zentry.api.dto.MetodoPagoDto;
import com.zentry.api.repository.MetodoPagoRepository;
import com.zentry.api.service.MetodoPagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetodoPagoServiceImpl implements MetodoPagoService {
    private final MetodoPagoRepository metodoPagoRepository;

    @Override
    public List<MetodoPagoDto> list() {
        return List.of();
    }

    @Override
    public Page<MetodoPagoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        return null;
    }

    @Override
    public MetodoPagoDto findById(Long id) {
        return null;
    }

    @Override
    public MetodoPagoDto save(MetodoPagoDto metodoPagoDto) {
        return null;
    }

    @Override
    public MetodoPagoDto update(MetodoPagoDto metodoPagoDto) {
        return null;
    }

    @Override
    public String delete(Long id) {
        return "";
    }
}
