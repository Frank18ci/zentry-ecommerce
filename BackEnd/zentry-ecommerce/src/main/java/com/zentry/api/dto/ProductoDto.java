package com.zentry.api.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.EstadoProducto;
import com.zentry.api.model.Producto;
import com.zentry.api.model.SubCategoria;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductoDto {
	private Long id;
	private SubCategoriaDto subCategoria;
	private EstadoProductoDto estadoProducto;
	private String nombre;
	private String descripcion;
	private BigDecimal precio;
	private Date fechaCreacion;
	private List<ProductoVarianteCatalogoDto> productosVariantes;
	
	public static ProductoDto productoToProductoDTO(Producto producto)
	{
		return ProductoDto.builder()
				.id(producto.getId())
				.subCategoria(SubCategoriaDto.subCategoriaToSubCategoriaDto(producto.getSubCategoria() != null ? producto.getSubCategoria() : SubCategoria.builder().build()))
				.estadoProducto(EstadoProductoDto.estadoProductoToEstadoProductoDto(producto.getEstadoProducto() != null ? producto.getEstadoProducto() : EstadoProducto.builder().build()))
				.nombre(producto.getNombre())
				.descripcion(producto.getDescripcion())
				.precio(producto.getPrecio())
				.fechaCreacion(producto.getFechaCreacion())
				.productosVariantes(ProductoVarianteCatalogoDto.listProductoVarianteCatalogoToListProductoVarianteCatalogoDto(producto.getProductoVariantes() != null ? producto.getProductoVariantes() : List.of()))
				.build();
	}
	public static List<ProductoDto> listProductoToListProductoDto(List<Producto> listProducto){
		return listProducto.stream()
				.map(ProductoDto::productoToProductoDTO)
				.collect(Collectors.toList());
	}
	public static Producto productoDtoToProducto(ProductoDto productoDto) {
		return Producto.builder()
				.id(productoDto.getId())
				.subCategoria(SubCategoriaDto.subCategoriaDtoToSubCategoria(productoDto.getSubCategoria() != null ? productoDto.getSubCategoria() : SubCategoriaDto.builder().build()))
				.estadoProducto(EstadoProductoDto.estadoProductoDtoToEstadoProducto(productoDto.getEstadoProducto() != null ? productoDto.getEstadoProducto() : EstadoProductoDto.builder().build()))
				.nombre(productoDto.getNombre())
				.descripcion(productoDto.getDescripcion())
				.precio(productoDto.getPrecio())
				.fechaCreacion(productoDto.getFechaCreacion())
				.build();
	}
}
