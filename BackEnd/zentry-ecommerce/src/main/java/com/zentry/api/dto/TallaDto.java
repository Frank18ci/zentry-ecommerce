package com.zentry.api.dto;



import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Talla;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TallaDto {

	private Long id;
	private String nombre;
	//
	public static TallaDto tallaToTallaDto(Talla talla) {
		return TallaDto.builder()
				.id(talla.getId())
				.nombre(talla.getNombre())
				.build();
	}
	public static Talla tallaDtoToTalla(TallaDto tallaDTO) {
		return Talla.builder()
				.id(tallaDTO.getId())
				.nombre(tallaDTO.getNombre())
				.build();
	}
	public static List<TallaDto> listTallaToListTallaDto(List<Talla> tallas)
	{
		return tallas.stream().map(TallaDto::tallaToTallaDto).collect(Collectors.toList());
	}
}
