package com.zentry.api.dto;

import com.zentry.api.model.EstadoCarrito;
import com.zentry.api.model.Usuario;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CarritoDto {
    private Long id;
    private Usuario usuario;
    private EstadoCarrito estadoCarrito;
    private Date fechaCreacion;
}
