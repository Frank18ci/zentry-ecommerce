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
public class ColorDto {
	 private Long id;
	 private String nombre;
	 private String codigoHex;
	 //
	 public static ColorDto colorToColorDto(Color color)
	 {
		 return ColorDto.builder()
				 .id(color.getId())
				 .nombre(color.getNombre())
				 .codigoHex(color.getCodigoHex())
				 .build();
	 }
	 public static List<ColorDto> listColorToListColorDto(List<Color> colores )
	 {
		 return colores.stream().map(ColorDto::colorToColorDto).collect(Collectors.toList());
	 }
	 public static Color colorDtoToColor(ColorDto colorDto)
	 {
		 return Color.builder()
				 .id(colorDto.getId())
				 .nombre(colorDto.getNombre())
				 .codigoHex(colorDto.getCodigoHex())
				 .build();
	 }
	
}
