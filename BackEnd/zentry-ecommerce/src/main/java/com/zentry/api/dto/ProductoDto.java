package com.zentry.api.dto;

import com.zentry.api.model.Producto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductoDto {
	
	
	
	//
	public static ProductoDto productoToProductoDTO(Producto producto)
	{
		ProductoDto a = new ProductoDto();
		return a;
	}
}
