package com.zentry.api.dto;

import com.zentry.api.model.ComentarioProducto;
import com.zentry.api.model.Producto;
import com.zentry.api.model.Usuario;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ComentarioProductoDto {
    private Long id;
    private UsuarioDto usuario;
    private ProductoDto producto;
    private int calificacion;
    private String comentario;
    private LocalDateTime fecha;

    public static ComentarioProductoDto comentarioProductoToComentarioProductoDto(ComentarioProducto comentarioProducto){
        return ComentarioProductoDto.builder()
                .id(comentarioProducto.getId())
                .usuario(UsuarioDto.usuarioToUsuarioDto(comentarioProducto.getUsuario() != null ? comentarioProducto.getUsuario() : Usuario.builder().build()))
                .producto(ProductoDto.productoToProductoDTO(comentarioProducto.getProducto() != null ? comentarioProducto.getProducto() : Producto.builder().build()))
                .calificacion(comentarioProducto.getCalificacion())
                .comentario(comentarioProducto.getComentario())
                .fecha(comentarioProducto.getFecha())
                .build();
    }
    public static List<ComentarioProductoDto> listComentarioProductoToListComentarioProductoDto(List<ComentarioProducto> listComentarioProducto){
        return listComentarioProducto.stream().map(ComentarioProductoDto::comentarioProductoToComentarioProductoDto).collect(Collectors.toList());
    }
    public static ComentarioProducto comentarioProductoDtoToComentarioProducto(ComentarioProductoDto comentarioProductoDto){
        return ComentarioProducto.builder()
                .id(comentarioProductoDto.getId())
                .usuario(UsuarioDto.usuarioDtoToUsuario(comentarioProductoDto.getUsuario() != null ? comentarioProductoDto.getUsuario() : UsuarioDto.builder().build()))
                .producto(ProductoDto.productoDtoToProducto(comentarioProductoDto.getProducto() != null ? comentarioProductoDto.getProducto() : ProductoDto.builder().build()))
                .calificacion(comentarioProductoDto.getCalificacion())
                .comentario(comentarioProductoDto.getComentario())
                .fecha(comentarioProductoDto.getFecha())
                .build();
    }
}
