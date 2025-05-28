package com.zentry.api.dto;

import com.zentry.api.model.EstadoOrden;
import com.zentry.api.model.Orden;
import com.zentry.api.model.Usuario;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class OrdenDto {
    private Long id;
    private UsuarioDto usuario;
    private EstadoOrdenDto estadoOrden;
    private BigDecimal total;
    private LocalDateTime fechaOrden;
    private String direccionEnvio;

    public static OrdenDto ordenToOrdenDto(Orden orden){
        return OrdenDto.builder()
                .id(orden.getId())
                .usuario(UsuarioDto.usuarioToUsuarioDto(orden.getUsuario() != null ? orden.getUsuario() : Usuario.builder().build()))
                .estadoOrden(EstadoOrdenDto.estadoOrdenToEstadoOrdenDto(orden.getEstadoOrden() != null ? orden.getEstadoOrden() : EstadoOrden.builder().build()))
                .total(orden.getTotal())
                .fechaOrden(orden.getFechaOrden())
                .direccionEnvio(orden.getDireccionEnvio())
                .build();
    }
    public static List<OrdenDto> listOrdenToListOrdenDto(List<Orden> listOrden){
        return  listOrden.stream().map(OrdenDto::ordenToOrdenDto).collect(Collectors.toList());
    }
    public static Orden ordenDtoToOrden(OrdenDto ordenDto){
        return Orden.builder()
                .id(ordenDto.getId())
                .usuario(UsuarioDto.usuarioDtoToUsuario(ordenDto.getUsuario() != null ? ordenDto.getUsuario() : UsuarioDto.builder().build()))
                .estadoOrden(EstadoOrdenDto.estadoOrdenDtoToEstadoOrden(ordenDto.getEstadoOrden() != null ? ordenDto.getEstadoOrden() : EstadoOrdenDto.builder().build()))
                .total(ordenDto.getTotal())
                .fechaOrden(ordenDto.getFechaOrden())
                .direccionEnvio(ordenDto.getDireccionEnvio())
                .build();
    }
}
