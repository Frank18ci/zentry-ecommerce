package com.zentry.api.dto;



import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Color;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ColorDTO {
	 private Long id;
	 private String nombre;
	 private String codigoHex;
	 //
	 public static ColorDTO colorToColorDto(Color color)
	 {
		 return ColorDTO.builder()
				 .id(color.getId())
				 .nombre(color.getNombre())
				 .codigoHex(color.getCodigoHex())
				 .build();
	 }
	 public static List<ColorDTO> listColorToListColorDto(List<Color> colores )
	 {
		 return colores.stream().map(ColorDTO::colorToColorDto).collect(Collectors.toList());
	 }
	 public static Color colorDtoToColor(ColorDTO colorDto)
	 {
		 return Color.builder()
				 .id(colorDto.getId())
				 .nombre(colorDto.getNombre())
				 .codigoHex(colorDto.getCodigoHex())
				 .build();
	 }
	
}
