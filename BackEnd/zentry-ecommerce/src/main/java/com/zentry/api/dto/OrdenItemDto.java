package com.zentry.api.dto;

import com.zentry.api.model.Orden;
import com.zentry.api.model.OrdenItem;
import com.zentry.api.model.ProductoVariante;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class OrdenItemDto {
    private Long id;
    private OrdenDto orden;
    private ProductoVarianteDto productoVariante;
    private int cantidad;
    private BigDecimal precioUnitario;

    public static OrdenItemDto orderItemToOrdenItemDto(OrdenItem ordenItem){
        return OrdenItemDto.builder()
                .id(ordenItem.getId())
                .orden(OrdenDto.ordenToOrdenDto(ordenItem.getOrden() != null ? ordenItem.getOrden() : Orden.builder().build()))
                .productoVariante(ProductoVarianteDto.productoVarienteToProductoVarienteDto(ordenItem.getProductoVariante() != null ? ordenItem.getProductoVariante() : ProductoVariante.builder().build()))
                .cantidad(ordenItem.getCantidad())
                .precioUnitario(ordenItem.getPrecioUnitario())
                .build();
    }
    public static List<OrdenItemDto> listOrderItemToListOrdenItemDto(List<OrdenItem> listOrdenItem) {
        return listOrdenItem.stream().map(OrdenItemDto::orderItemToOrdenItemDto).collect(Collectors.toList());
    }
    public static OrdenItem orderItemDtoToOrdenItem(OrdenItemDto ordenItemDto){
        return OrdenItem.builder()
                .id(ordenItemDto.getId())
                .orden(OrdenDto.ordenDtoToOrden(ordenItemDto.getOrden() != null ? ordenItemDto.getOrden() : OrdenDto.builder().build()))
                .productoVariante(ProductoVarianteDto.productoVarienteDtoToProductoVariente(ordenItemDto.getProductoVariante() != null ? ordenItemDto.getProductoVariante() : ProductoVarianteDto.builder().build()))
                .cantidad(ordenItemDto.getCantidad())
                .precioUnitario(ordenItemDto.getPrecioUnitario())
                .build();
    }
}
