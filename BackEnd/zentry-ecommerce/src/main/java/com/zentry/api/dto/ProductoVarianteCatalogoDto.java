package com.zentry.api.dto;

import com.zentry.api.model.Color;
import com.zentry.api.model.Producto;
import com.zentry.api.model.ProductoVariante;
import com.zentry.api.model.Talla;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoVarianteCatalogoDto {
	private Long id;
    private TallaDto talla;
    private ColorDto color;
    private Integer stock;

    public static ProductoVarianteCatalogoDto productoVarienteCatalogoToProductoVarienteCatalogoDto(ProductoVariante productoVariante){
    	return ProductoVarianteCatalogoDto.builder()
    			.id(productoVariante.getId())
    			.talla(productoVariante.getTalla() != null?
    					TallaDto.tallaToTallaDto(productoVariante.getTalla()) :
    					TallaDto.builder().build())
    			.color(productoVariante.getColor() != null?
    					ColorDto.colorToColorDto(productoVariante.getColor()) :
    					ColorDto.builder().build())
    			.stock(productoVariante.getStock())
    			.build();
    }
    public static List<ProductoVarianteCatalogoDto> listProductoVarianteCatalogoToListProductoVarianteCatalogoDto(List<ProductoVariante> productoVariantes)
    {
    	return productoVariantes.stream().map(ProductoVarianteCatalogoDto::productoVarienteCatalogoToProductoVarienteCatalogoDto)
				.collect(Collectors.toList());
    }
    public static ProductoVariante productoVarienteCatalogoDtoToProductoVarienteCatalogo(ProductoVarianteCatalogoDto productoVarianteDto){
    	return ProductoVariante.builder()
    			.id(productoVarianteDto.getId())
    			.talla(productoVarianteDto.getTalla() != null?
    					TallaDto.tallaDtoToTalla(productoVarianteDto.getTalla()):
    					Talla.builder().build())
    			.color(productoVarianteDto.getColor() != null?
    					ColorDto.colorDtoToColor(productoVarianteDto.getColor()) :
    					Color.builder().build())
    			.stock(productoVarianteDto.getStock())
    			.build();
    }
	public static List<ProductoVariante> listProductoVarianteCatalogoDtoToListProductoVarianteCatalogo(List<ProductoVarianteCatalogoDto> productoVariantesDto)
	{
		return productoVariantesDto.stream().map(ProductoVarianteCatalogoDto::productoVarienteCatalogoDtoToProductoVarienteCatalogo)
				.collect(Collectors.toList());
	}
}
