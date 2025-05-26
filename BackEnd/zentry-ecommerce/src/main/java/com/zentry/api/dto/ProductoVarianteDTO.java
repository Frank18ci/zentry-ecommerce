package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Color;
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
public class ProductoVarianteDTO {
	private Long id;
    private ProductoDto producto;
    private TallaDTO talla;
    private ColorDTO color;
    private Integer stock;
    
    //
    public static ProductoVarianteDTO productoVarienteToProductoVarienteDto(ProductoVariante productoVariante){
    	return ProductoVarianteDTO.builder()
    			.id(productoVariante.getId())
    			//.producto(productoVariante.getProducto() != null ?
    			//		ProductoDto.productoToProductoDTO(ProductoVariante.getProducto()) :
    			//		ProductoDto.builder().build)
    			.talla(productoVariante.getTalla() != null?
    					TallaDTO.tallaToTallaDto(productoVariante.getTalla()) :
    					TallaDTO.builder().build())
    			.color(productoVariante.getColor() != null?
    					ColorDTO.colorToColorDto(productoVariante.getColor()) :
    					ColorDTO.builder().build())
    			.stock(productoVariante.getStock())
    			.build();
    }
    public static List<ProductoVarianteDTO> listProductoVarianteToListProductoVarianteDto(List<ProductoVariante> productoVariantes)
    {
    	return productoVariantes.stream().map(ProductoVarianteDTO::productoVarienteToProductoVarienteDto)
				.collect(Collectors.toList());
    }
    public static ProductoVariante productoVarienteDtoToProductoVariente(ProductoVarianteDTO productoVarianteDto){
    	return ProductoVariante.builder()
    			.id(productoVarianteDto.getId())
    			//.producto(productoVariante.getProducto() != null ?
    			//		ProductoDto.productoToProductoDTO(ProductoVariante.getProducto()) :
    			//		ProductoDto.builder().build)
    			.talla(productoVarianteDto.getTalla() != null?
    					TallaDTO.tallaDtoToTalla(productoVarianteDto.getTalla()):
    					Talla.builder().build())
    			.color(productoVarianteDto.getColor() != null?
    					ColorDTO.colorDtoToColor(productoVarianteDto.getColor()) :
    					Color.builder().build())
    			.stock(productoVarianteDto.getStock())
    			.build();
    }
}
