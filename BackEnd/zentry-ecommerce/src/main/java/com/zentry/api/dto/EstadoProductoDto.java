package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.EstadoProducto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EstadoProductoDto {
	private Long id;
	private String nombre;
	
	public static EstadoProductoDto estadoProductoToEstadoProductoDto(EstadoProducto estadoProducto) {
		return EstadoProductoDto.builder()
				.id(estadoProducto.getId())
				.nombre(estadoProducto.getNombre())
				.build();
	}
	public static List<EstadoProductoDto> listEstadoProductoToListEstadoProductoDto(List<EstadoProducto> listEstadoProducto){
		return listEstadoProducto.stream()
				.map(EstadoProductoDto::estadoProductoToEstadoProductoDto)
				.collect(Collectors.toList());
	}
	public static EstadoProducto estadoProductoDtoToEstadoProducto(EstadoProductoDto estadoProductoDto) {
		return EstadoProducto.builder()
				.id(estadoProductoDto.getId())
				.nombre(estadoProductoDto.getNombre())
				.build();
	}
}
