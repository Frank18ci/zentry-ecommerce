package com.zentry.api.dto;

import com.zentry.api.model.ImagenProducto;
import com.zentry.api.model.Producto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ImagenProductoDto {
    private Long id;
    private ProductoDto producto;
    private String urlImagen;
    private boolean principal;

    public static ImagenProductoDto imagenProductoToImagenProductoDto(ImagenProducto imagenProducto){
        return ImagenProductoDto.builder()
                .id(imagenProducto.getId())
                .producto(ProductoDto.productoToProductoDTO(imagenProducto.getProducto() != null ? imagenProducto.getProducto() : Producto.builder().build()))
                .urlImagen(imagenProducto.getUrlImagen())
                .principal(imagenProducto.isPrincipal())
                .build();
    }
    public static List<ImagenProductoDto> listImagenProductoToListImagenProductoDto(List<ImagenProducto> listImagenProductos){
        return listImagenProductos.stream().map(ImagenProductoDto::imagenProductoToImagenProductoDto).collect(Collectors.toList());
    }
    public static ImagenProducto imagenProductoDtoToImagenProducto(ImagenProductoDto imagenProductoDto){
        return ImagenProducto.builder()
                .id(imagenProductoDto.getId())
                .producto(ProductoDto.productoDtoToProducto(imagenProductoDto.getProducto() != null ? imagenProductoDto.getProducto() : ProductoDto.builder().build()))
                .urlImagen(imagenProductoDto.getUrlImagen())
                .principal(imagenProductoDto.isPrincipal())
                .build();
    }
}

