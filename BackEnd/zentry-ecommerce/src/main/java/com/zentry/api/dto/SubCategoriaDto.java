package com.zentry.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoriaDto {
	private Long id;
	private CategoriaDto categoria;
	private String nombre;
	private String descripcion;
}
