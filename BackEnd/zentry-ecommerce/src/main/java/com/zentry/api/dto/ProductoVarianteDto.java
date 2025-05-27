package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Color;
import com.zentry.api.model.Producto;
import com.zentry.api.model.ProductoVariante;
import com.zentry.api.model.Talla;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoVarianteDto {
	private Long id;
    private ProductoDto producto;
    private TallaDto talla;
    private ColorDto color;
    private Integer stock;

    public static ProductoVarianteDto productoVarienteToProductoVarienteDto(ProductoVariante productoVariante){
    	return ProductoVarianteDto.builder()
    			.id(productoVariante.getId())
    			.producto(productoVariante.getProducto() != null ?
    					ProductoDto.productoToProductoDTO(productoVariante.getProducto()) :
    					ProductoDto.builder().build())
    			.talla(productoVariante.getTalla() != null?
    					TallaDto.tallaToTallaDto(productoVariante.getTalla()) :
    					TallaDto.builder().build())
    			.color(productoVariante.getColor() != null?
    					ColorDto.colorToColorDto(productoVariante.getColor()) :
    					ColorDto.builder().build())
    			.stock(productoVariante.getStock())
    			.build();
    }
    public static List<ProductoVarianteDto> listProductoVarianteToListProductoVarianteDto(List<ProductoVariante> productoVariantes)
    {
    	return productoVariantes.stream().map(ProductoVarianteDto::productoVarienteToProductoVarienteDto)
				.collect(Collectors.toList());
    }
    public static ProductoVariante productoVarienteDtoToProductoVariente(ProductoVarianteDto productoVarianteDto){
    	return ProductoVariante.builder()
    			.id(productoVarianteDto.getId())
				.producto(productoVarianteDto.getProducto() != null ?
						ProductoDto.productoDtoToProducto(productoVarianteDto.getProducto()) :
						Producto.builder().build())
    			.talla(productoVarianteDto.getTalla() != null?
    					TallaDto.tallaDtoToTalla(productoVarianteDto.getTalla()):
    					Talla.builder().build())
    			.color(productoVarianteDto.getColor() != null?
    					ColorDto.colorDtoToColor(productoVarianteDto.getColor()) :
    					Color.builder().build())
    			.stock(productoVarianteDto.getStock())
    			.build();
    }
	public static List<ProductoVariante> listProductoVarianteDtoToListProductoVariante(List<ProductoVarianteDto> productoVariantesDto)
	{
		return productoVariantesDto.stream().map(ProductoVarianteDto::productoVarienteDtoToProductoVariente)
				.collect(Collectors.toList());
	}
}
