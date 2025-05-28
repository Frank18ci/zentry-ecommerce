package com.zentry.api.dto;

import com.zentry.api.model.ImagenProducto;
import com.zentry.api.model.Producto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ImagenProductoCatalogoDto {
    private Long id;
    private String urlImagen;
    private boolean principal;

    public static ImagenProductoCatalogoDto imagenProductoToImagenProductoDto(ImagenProducto imagenProducto){
        return ImagenProductoCatalogoDto.builder()
                .id(imagenProducto.getId())
                .urlImagen(imagenProducto.getUrlImagen())
                .principal(imagenProducto.isPrincipal())
                .build();
    }
    public static List<ImagenProductoCatalogoDto> listImagenProductoToListImagenProductoDto(List<ImagenProducto> listImagenProductos){
        return listImagenProductos.stream().map(ImagenProductoCatalogoDto::imagenProductoToImagenProductoDto).collect(Collectors.toList());
    }
    public static ImagenProducto imagenProductoDtoToImagenProducto(ImagenProductoCatalogoDto imagenProductoDto){
        return ImagenProducto.builder()
                .id(imagenProductoDto.getId())
                .urlImagen(imagenProductoDto.getUrlImagen())
                .principal(imagenProductoDto.isPrincipal())
                .build();
    }
    public static List<ImagenProducto> listImagenProductoDtoToListImagenProducto(List<ImagenProductoCatalogoDto> listImagenProductos){
        return listImagenProductos.stream().map(ImagenProductoCatalogoDto::imagenProductoDtoToImagenProducto).collect(Collectors.toList());
    }
}

