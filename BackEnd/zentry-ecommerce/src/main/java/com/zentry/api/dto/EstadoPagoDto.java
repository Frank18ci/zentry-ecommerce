package com.zentry.api.dto;

import com.zentry.api.model.EstadoPago;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class EstadoPagoDto {
    private Long id;
    private String nombre;

    public static EstadoPagoDto estadoPagoToEstadoPagoDto(EstadoPago estadoPago){
        return EstadoPagoDto.builder()
                .id(estadoPago.getId())
                .nombre(estadoPago.getNombre())
                .build();
    }
    public static List<EstadoPagoDto> listEstadoPagoToListEstadoPago(List<EstadoPago> listEstadoPagos){
        return  listEstadoPagos.stream().map(EstadoPagoDto::estadoPagoToEstadoPagoDto).collect(Collectors.toList());
    }
    public static EstadoPago estadoPagoDtoToEstadoPago(EstadoPagoDto estadoPagoDto){
        return EstadoPago.builder()
                .id(estadoPagoDto.getId())
                .nombre(estadoPagoDto.getNombre())
                .build();
    }
}
