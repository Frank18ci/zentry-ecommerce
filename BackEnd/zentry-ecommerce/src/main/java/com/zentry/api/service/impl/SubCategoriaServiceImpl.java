package com.zentry.api.service.impl;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.SubCategoriaDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.Producto;
import com.zentry.api.model.SubCategoria;
import com.zentry.api.repository.SubCategoriaRepository;
import com.zentry.api.service.ProductoService;
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
public class SubCategoriaServiceImpl implements SubCategoriaService {
    private final SubCategoriaRepository subCategoriaRepository;

    @Override
    public List<SubCategoriaDto> list() {
        return SubCategoriaDto.listSubCategoriaToListSubCategoriaDto(subCategoriaRepository.findAll());
    }

    @Override
    public Page<SubCategoriaDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<SubCategoria> subCategorias = subCategoriaRepository.findByNombreContaining(nombre, pageable);
        return subCategorias.map(SubCategoriaDto::subCategoriaToSubCategoriaDto);
    }

    @Override
    public SubCategoriaDto findById(Long id) {
        return SubCategoriaDto.subCategoriaToSubCategoriaDto(subCategoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Sub Categoria no encontrado con id " + id)));
    }

    @Override
    public SubCategoriaDto save(SubCategoriaDto subCategoriaDto) {
        SubCategoria subCategoria = SubCategoriaDto.subCategoriaDtoToSubCategoria(subCategoriaDto);
        SubCategoria subCategoriaSaved = subCategoriaRepository.save(subCategoria);
        return SubCategoriaDto.subCategoriaToSubCategoriaDto(subCategoriaSaved);
    }

    @Override
    public SubCategoriaDto update(SubCategoriaDto subCategoriaDto) {
        SubCategoria subCategoria = subCategoriaRepository.findById(subCategoriaDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Sub Categoria no encontrado con id " + subCategoriaDto.getId()));

        subCategoria.setCategoria(CategoriaDto.categoriaDtoToCategoria(subCategoriaDto.getCategoria()));
        subCategoria.setNombre(subCategoria.getNombre());
        subCategoria.setDescripcion(subCategoria.getDescripcion());

        SubCategoria subCategoriaUpdated = subCategoriaRepository.save(subCategoria);
        return SubCategoriaDto.subCategoriaToSubCategoriaDto(subCategoriaUpdated);
    }

    private final ProductoService productoService;

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }

        SubCategoria subCategoria = subCategoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Sub Categoria no encontrado con id " + id));

        for(Producto producto : subCategoria.getProductos()){
            productoService.deleteProductoById(producto.getId());
        }

        subCategoriaRepository.deleteById(id);
        return "Sub Categoria con id " + id + " eliminado";
    }
}
