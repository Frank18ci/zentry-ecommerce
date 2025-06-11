package com.zentry.api.dto;

import com.zentry.api.model.EstadoProducto;
import com.zentry.api.model.Producto;
import com.zentry.api.model.SubCategoria;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Data
@Builder
public class ProductoListadoDto {
	private Long id;
	private SubCategoriaDto subCategoria;
	private EstadoProductoDto estadoProducto;
	private String nombre;
	private String descripcion;
	private BigDecimal precio;
	private Date fechaCreacion;
	private List<ProductoVarianteCatalogoDto> productosVariantes;
	private List<ImagenProductoCatalogoDto> imagenes;
	
	public static ProductoListadoDto productoToProductoDTO(Producto producto)
	{
		return ProductoListadoDto.builder()
				.id(producto.getId())
				.subCategoria(SubCategoriaDto.subCategoriaToSubCategoriaDto(producto.getSubCategoria() != null ? producto.getSubCategoria() : SubCategoria.builder().build()))
				.estadoProducto(EstadoProductoDto.estadoProductoToEstadoProductoDto(producto.getEstadoProducto() != null ? producto.getEstadoProducto() : EstadoProducto.builder().build()))
				.nombre(producto.getNombre())
				.descripcion(producto.getDescripcion())
				.precio(producto.getPrecio())
				.fechaCreacion(producto.getFechaCreacion())
				.productosVariantes(ProductoVarianteCatalogoDto.listProductoVarianteCatalogoToListProductoVarianteCatalogoDto(producto.getProductoVariantes() != null ? producto.getProductoVariantes() : List.of()))
				.imagenes(ImagenProductoCatalogoDto.listImagenProductoToListImagenProductoDto(producto.getImagenProductos() != null ? producto.getImagenProductos() : List.of()))
				.build();
	}
	public static List<ProductoListadoDto> listProductoToListProductoDto(List<Producto> listProducto){
		return listProducto.stream()
				.map(ProductoListadoDto::productoToProductoDTO)
				.collect(Collectors.toList());
	}
	public static Producto productoDtoToProducto(ProductoListadoDto productoDto) {
		return Producto.builder()
				.id(productoDto.getId())
				.subCategoria(SubCategoriaDto.subCategoriaDtoToSubCategoria(productoDto.getSubCategoria() != null ? productoDto.getSubCategoria() : SubCategoriaDto.builder().build()))
				.estadoProducto(EstadoProductoDto.estadoProductoDtoToEstadoProducto(productoDto.getEstadoProducto() != null ? productoDto.getEstadoProducto() : EstadoProductoDto.builder().build()))
				.nombre(productoDto.getNombre())
				.descripcion(productoDto.getDescripcion())
				.precio(productoDto.getPrecio())
				.fechaCreacion(productoDto.getFechaCreacion())
				.productoVariantes(ProductoVarianteCatalogoDto.listProductoVarianteCatalogoDtoToListProductoVarianteCatalogo(productoDto.getProductosVariantes()))
				.imagenProductos(ImagenProductoCatalogoDto.listImagenProductoDtoToListImagenProducto(productoDto.getImagenes()))
				.build();
	}
}
