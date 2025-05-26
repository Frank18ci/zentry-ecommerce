package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Categoria;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaDto {
	private Long id;
	private String nombre;
	private String descripcion;
	
	public static CategoriaDto categoriaToCategoriaDto(Categoria categoria) {
		return CategoriaDto.builder()
				.id(categoria.getId())
				.nombre(categoria.getNombre())
				.descripcion(categoria.getDescripcion())
				.build();
	}
	public static List<CategoriaDto> listCategoriaToListCategoriaDto(List<Categoria> listCategoria){
		return listCategoria.stream()
				.map(CategoriaDto::categoriaToCategoriaDto)
				.collect(Collectors.toList());
	}
	public static Categoria categoriaDtoToCategoria(CategoriaDto categoriaDto) {
		return Categoria.builder()
				.id(categoriaDto.getId())
				.nombre(categoriaDto.getNombre())
				.descripcion(categoriaDto.getDescripcion())
				.build();
	}
}
