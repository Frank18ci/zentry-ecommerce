package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Categoria;
import com.zentry.api.model.SubCategoria;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubCategoriaDto {
	private Long id;
	private CategoriaDto categoria;
	private String nombre;
	private String descripcion;
	
	public static SubCategoriaDto subCategoriaToSubCategoriaDto(SubCategoria subCategoria) {
		return SubCategoriaDto.builder()
				.id(subCategoria.getId())
				.categoria(CategoriaDto.categoriaToCategoriaDto(
					    subCategoria.getCategoria() != null ? subCategoria.getCategoria() : Categoria.builder().build()
					))
				.nombre(subCategoria.getNombre())
				.descripcion(subCategoria.getDescripcion())
				.build();
	}
	public static List<SubCategoriaDto> listSubCategoriaToListSubCategoriaDto(List<SubCategoria> listSubCategoria){
		return listSubCategoria
				.stream().map(SubCategoriaDto::subCategoriaToSubCategoriaDto)
				.collect(Collectors.toList());
	}
	public static SubCategoria subCategoriaDtoToSubCategoria(SubCategoriaDto subCategoriaDto) {
		return SubCategoria.builder()
				.id(subCategoriaDto.getId())
				.categoria(CategoriaDto.categoriaDtoToCategoria(
					    subCategoriaDto.getCategoria() != null ? subCategoriaDto.getCategoria() : CategoriaDto.builder().build()
					))
				.nombre(subCategoriaDto.getNombre())
				.descripcion(subCategoriaDto.getDescripcion())
				.build();
	}
}
