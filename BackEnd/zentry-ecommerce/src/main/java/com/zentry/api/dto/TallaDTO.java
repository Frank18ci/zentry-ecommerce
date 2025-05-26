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
public class TallaDTO {

	private Long id;
	private String nombre;
	//
	public static TallaDTO tallaToTallaDto(Talla talla) {
		return TallaDTO.builder()
				.id(talla.getId())
				.nombre(talla.getNombre())
				.build();
	}
	public static Talla tallaDtoToTalla(TallaDTO tallaDTO) {
		return Talla.builder()
				.id(tallaDTO.getId())
				.nombre(tallaDTO.getNombre())
				.build();
	}
	public static List<TallaDTO> listTallaToListTallaDto(List<Talla> tallas)
	{
		return tallas.stream().map(TallaDTO::tallaToTallaDto).collect(Collectors.toList());
	}
}
