package com.zentry.api.service.impl;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Categoria;
import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.SubCategoria;
import com.zentry.api.repository.CategoriaRepository;
import com.zentry.api.service.CategoriaService;
import com.zentry.api.service.SubCategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoriaServiceImpl implements CategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Override
    public List<CategoriaDto> list() {
        return CategoriaDto.listCategoriaToListCategoriaDto(categoriaRepository.findAll());
    }

    @Override
    public Page<CategoriaDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Categoria> categorias = categoriaRepository.findByNombreContaining(nombre, pageable);
        return categorias.map(CategoriaDto::categoriaToCategoriaDto);
    }

    @Override
    public CategoriaDto findById(Long id) {
        return CategoriaDto.categoriaToCategoriaDto(categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Categoria no encontrado con id" + id)));
    }

    @Override
    public CategoriaDto save(CategoriaDto categoriaDto) {
        Categoria categoria = CategoriaDto.categoriaDtoToCategoria(categoriaDto);
        Categoria categoriaSaved = categoriaRepository.save(categoria);
        return  CategoriaDto.categoriaToCategoriaDto(categoriaSaved);
    }

    @Override
    public CategoriaDto update(CategoriaDto categoriaDto) {
        Categoria categoria = categoriaRepository.findById(categoriaDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Categoria no encontrado con id" + categoriaDto.getId()));
        categoria.setNombre(categoriaDto.getNombre());
        categoria.setDescripcion(categoriaDto.getDescripcion());
        Categoria categoriaUpdated = categoriaRepository.save(categoria);
        return CategoriaDto.categoriaToCategoriaDto(categoriaUpdated);
    }

    private final SubCategoriaService subCategoriaService;

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Categoria no encontrado con id" + id));

        for(SubCategoria subCategoria : categoria.getSubCategorias()){
            subCategoriaService.deleteById(subCategoria.getId());
        }

        categoriaRepository.deleteById(id);
        return "Categoria con id " + id + " eliminado";
    }
}
