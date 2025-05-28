package com.zentry.api.dto;

import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.MetodoPago;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class MetodoPagoDto {
    private Long id;
    private String nombre;

    public static MetodoPagoDto metodoPagoToMetadoPagoDto(MetodoPago metodoPago){
        return MetodoPagoDto.builder()
                .id(metodoPago.getId())
                .nombre(metodoPago.getNombre())
                .build();
    }
    public static List<MetodoPagoDto> listMetodoPagoToListMetodoPagoDto(List<MetodoPago> listMetodoPago){
        return  listMetodoPago.stream().map(MetodoPagoDto::metodoPagoToMetadoPagoDto).collect(Collectors.toList());
    }
    public static MetodoPago metodoPagoDtoToMetadoPago(MetodoPagoDto metodoPagoDto){
        return MetodoPago.builder()
                .id(metodoPagoDto.getId())
                .nombre(metodoPagoDto.getNombre())
                .build();
    }
}
