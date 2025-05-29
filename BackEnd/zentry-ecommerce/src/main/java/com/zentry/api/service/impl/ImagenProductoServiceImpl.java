package com.zentry.api.service.impl;

import com.zentry.api.dto.ImagenProductoDto;
import com.zentry.api.dto.ProductoDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.EstadoProducto;
import com.zentry.api.model.ImagenProducto;
import com.zentry.api.repository.ImagenProductoRepository;
import com.zentry.api.service.ImagenProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImagenProductoServiceImpl implements ImagenProductoService {
    private final ImagenProductoRepository imagenProductoRepository;

    @Override
    public List<ImagenProductoDto> list() {
        return ImagenProductoDto.listImagenProductoToListImagenProductoDto(imagenProductoRepository.findAll());
    }

    @Override
    public Page<ImagenProductoDto> listFiltro(int page, int size, String sortBy, String direction, String nombreProducto) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<ImagenProducto> imagenProductos = imagenProductoRepository.findByProducto_NombreContaining(nombreProducto, pageable);
        return imagenProductos.map(ImagenProductoDto::imagenProductoToImagenProductoDto);
    }

    @Override
    public ImagenProductoDto findById(Long id) {
        return ImagenProductoDto.imagenProductoToImagenProductoDto(imagenProductoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Imagen Producto no encontrado con id " + id)));
    }

    @Override
    public ImagenProductoDto save(ImagenProductoDto imagenProductoDto) {
        ImagenProducto imagenProducto = ImagenProductoDto.imagenProductoDtoToImagenProducto(imagenProductoDto);
        ImagenProducto imagenProductoSaved = imagenProductoRepository.save(imagenProducto);
        return ImagenProductoDto.imagenProductoToImagenProductoDto(imagenProductoSaved);
    }

    @Override
    public ImagenProductoDto update(ImagenProductoDto imagenProductoDto) {
        ImagenProducto imagenProducto = imagenProductoRepository.findById(imagenProductoDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Imagen Producto no encontrado con id " + imagenProductoDto.getId()));

        imagenProducto.setProducto(ProductoDto.productoDtoToProducto(imagenProductoDto.getProducto()));
        imagenProducto.setUrlImagen(imagenProducto.getUrlImagen());
        imagenProducto.setPrincipal(imagenProducto.isPrincipal());

        ImagenProducto imagenProductoUpdated = imagenProductoRepository.save(imagenProducto);
        return ImagenProductoDto.imagenProductoToImagenProductoDto(imagenProductoUpdated);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        imagenProductoRepository.deleteById(id);
        return "Imagen Producto con id " + id + " eliminado";
    }
}
