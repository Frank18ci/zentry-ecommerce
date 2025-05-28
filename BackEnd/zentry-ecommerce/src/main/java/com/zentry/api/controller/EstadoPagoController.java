package com.zentry.api.controller;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.ProductoDto;
import com.zentry.api.service.EstadoPagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/estadoPago")
public class EstadoPagoController {
    private final EstadoPagoService estadoPagoService;
    @GetMapping
    public ResponseEntity<?> getEstadoPagos() {
        return ResponseEntity.status(HttpStatus.OK).body(estadoPagoService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getEstadoPagosPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(estadoPagoService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEstadoPagoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(estadoPagoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveEstadoPago(@RequestBody EstadoPagoDto estadoPagoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(estadoPagoService.save(estadoPagoDto));
    }
    @PutMapping
    public ResponseEntity<?> updateProducto(@RequestBody EstadoPagoDto estadoPagoDto){
        return ResponseEntity.status(HttpStatus.OK).body(estadoPagoService.update(estadoPagoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstadoPago(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", estadoPagoService.delete(id));
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper);
    }
}
