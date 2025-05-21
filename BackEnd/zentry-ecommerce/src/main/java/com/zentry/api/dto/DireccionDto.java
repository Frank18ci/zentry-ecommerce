package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Direccion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DireccionDto {
	private Long id;
	private String direccion;
	private String ciudad;
	private String provincia;
	private String codigoPostal;
	private String pais;
	
	public static DireccionDto direccionToDireccionDto(Direccion direccion) {
		return DireccionDto.builder()
				.id(direccion.getId())
				.direccion(direccion.getDireccion())
				.ciudad(direccion.getCiudad())
				.provincia(direccion.getProvincia())
				.codigoPostal(direccion.getCodigoPostal())
				.pais(direccion.getPais())
				.build();
	}
	public static List<DireccionDto> listDireccionToListDireccionDto(List<Direccion> direcciones){
		return direcciones.stream().map(DireccionDto::direccionToDireccionDto).collect(Collectors.toList());
	}
	public static Direccion direccionDtoToDireccion(DireccionDto direccionDto) {
		return Direccion.builder()
				.id(direccionDto.getId())
				.direccion(direccionDto.getDireccion())
				.ciudad(direccionDto.getCiudad())
				.provincia(direccionDto.getProvincia())
				.codigoPostal(direccionDto.getCodigoPostal())
				.pais(direccionDto.getPais())
				.build();
	}
}
