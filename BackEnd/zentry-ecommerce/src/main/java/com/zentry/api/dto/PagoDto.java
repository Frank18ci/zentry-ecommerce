package com.zentry.api.dto;

import com.zentry.api.model.EstadoPago;
import com.zentry.api.model.MetodoPago;
import com.zentry.api.model.Orden;
import com.zentry.api.model.Pago;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class PagoDto {
    private Long id;
    private OrdenDto orden;
    private MetodoPagoDto metodoPago;
    private EstadoPagoDto estadoPago;
    private BigDecimal monto;
    private LocalDateTime fechaPago;

    public static PagoDto pagoToPagoDto(Pago pago){
        return PagoDto.builder()
                .id(pago.getId())
                .orden(OrdenDto.ordenToOrdenDto(pago.getOrden() != null ? pago.getOrden() : Orden.builder().build()))
                .metodoPago(MetodoPagoDto.metodoPagoToMetadoPagoDto(pago.getMetodoPago() != null ? pago.getMetodoPago() : MetodoPago.builder().build()))
                .estadoPago(EstadoPagoDto.estadoPagoToEstadoPagoDto(pago.getEstadoPago() != null ? pago.getEstadoPago() : EstadoPago.builder().build()))
                .monto(pago.getMonto())
                .fechaPago(pago.getFechaPago())
                .build();
    }
    public static List<PagoDto> listPagoToListPagoDto(List<Pago> listPago){
        return listPago.stream().map(PagoDto::pagoToPagoDto).collect(Collectors.toList());
    }
    public static Pago pagoDtoToPago(PagoDto pagoDto){
        return Pago.builder()
                .orden(OrdenDto.ordenDtoToOrden(pagoDto.getOrden() != null ? pagoDto.getOrden() : OrdenDto.builder().build()))
                .metodoPago(MetodoPagoDto.metodoPagoDtoToMetadoPago(pagoDto.getMetodoPago() != null ? pagoDto.getMetodoPago() : MetodoPagoDto.builder().build()))
                .estadoPago(EstadoPagoDto.estadoPagoDtoToEstadoPago(pagoDto.getEstadoPago() != null ? pagoDto.getEstadoPago() : EstadoPagoDto.builder().build()))
                .monto(pagoDto.getMonto())
                .fechaPago(pagoDto.getFechaPago())
                .build();
    }
}
