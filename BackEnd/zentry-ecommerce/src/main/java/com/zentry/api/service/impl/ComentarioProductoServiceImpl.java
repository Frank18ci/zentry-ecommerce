package com.zentry.api.service.impl;

import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.ProductoDto;
import com.zentry.api.dto.UsuarioDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.ComentarioProducto;
import com.zentry.api.repository.ComentarioProductoRepository;
import com.zentry.api.service.ComentarioProductoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComentarioProductoServiceImpl implements ComentarioProductoService {
    private final ComentarioProductoRepository comentarioProductoRepository;

    @Override
    public List<ComentarioProductoDto> list() {
        return ComentarioProductoDto.listComentarioProductoToListComentarioProductoDto(comentarioProductoRepository.findAll());
    }

    @Override
    public Page<ComentarioProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<ComentarioProducto> estadoOrden = comentarioProductoRepository.findByUsuario_NombreContaining(nombreUsuario, pageable);
        return  estadoOrden.map(ComentarioProductoDto::comentarioProductoToComentarioProductoDto);
    }

    @Override
    public ComentarioProductoDto findById(Long id) {
        return ComentarioProductoDto.comentarioProductoToComentarioProductoDto(comentarioProductoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Comentario Producto no encontrado con id " + id)));
    }

    @Override
    public ComentarioProductoDto save(ComentarioProductoDto comentarioProductoDto) {
        ComentarioProducto comentarioProducto = ComentarioProductoDto.comentarioProductoDtoToComentarioProducto(comentarioProductoDto);

        ComentarioProducto comentarioProductoSaved = comentarioProductoRepository.save(comentarioProducto);
        return ComentarioProductoDto.comentarioProductoToComentarioProductoDto(comentarioProductoSaved);
    }

    @Override
    public ComentarioProductoDto update(ComentarioProductoDto comentarioProductoDto) {
        ComentarioProducto comentarioProducto = comentarioProductoRepository.findById(comentarioProductoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Comentario Producto no encontrado con id " + comentarioProductoDto.getId()));

        comentarioProducto.setUsuario(UsuarioDto.usuarioDtoToUsuario(comentarioProductoDto.getUsuario()));
        comentarioProducto.setProducto(ProductoDto.productoDtoToProducto(comentarioProductoDto.getProducto()));
        comentarioProducto.setCalificacion(comentarioProducto.getCalificacion());
        comentarioProducto.setComentario(comentarioProducto.getComentario());

        ComentarioProducto comentarioProductoUpdated = comentarioProductoRepository.save(comentarioProducto);
        return ComentarioProductoDto.comentarioProductoToComentarioProductoDto(comentarioProductoUpdated);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        comentarioProductoRepository.deleteById(id);
        return "Comentario Producto con id " + id + " eliminado";
    }
}
