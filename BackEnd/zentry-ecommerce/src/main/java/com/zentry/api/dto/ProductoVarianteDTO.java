package com.zentry.api.dto;

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
    private ProductoDto idProducto;
    private TallaDTO idTalla;
    private ColorDTO idColor;
    private Integer stock;
    
    
}
