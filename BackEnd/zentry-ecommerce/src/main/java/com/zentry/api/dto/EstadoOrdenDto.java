package com.zentry.api.dto;

import com.zentry.api.model.EstadoOrden;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class EstadoOrdenDto {
    private Long id;
    private String nombre;

    public static EstadoOrdenDto estadoOrdenToEstadoOrdenDto(EstadoOrden estadoOrden){
        return EstadoOrdenDto.builder()
                .id(estadoOrden.getId())
                .nombre(estadoOrden.getNombre())
                .build();
    }
    public static List<EstadoOrdenDto> listEstadoOrdenToListEstadoOrdenDto(List<EstadoOrden> listEstadoOrden){
        return listEstadoOrden.stream().map(EstadoOrdenDto::estadoOrdenToEstadoOrdenDto).collect(Collectors.toList());
    }
    public static EstadoOrden estadoOrdenDtoToEstadoOrden(EstadoOrdenDto estadoOrdenDto){
        return EstadoOrden.builder()
                .id(estadoOrdenDto.getId())
                .nombre(estadoOrdenDto.getNombre())
                .build();
    }
}
