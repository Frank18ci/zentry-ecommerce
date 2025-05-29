package com.zentry.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.PagoDto;
import com.zentry.api.service.PagoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pago")
public class PagoController {
	private final PagoService pagoService;
	
	@GetMapping
    public ResponseEntity<?> getPago() {
        return ResponseEntity.status(HttpStatus.OK).body(pagoService.list());
    }
	
	@GetMapping("/page")
    public ResponseEntity<?> getPagoPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(pagoService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPagoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(pagoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> savePago(@RequestBody PagoDto pagoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoService.save(pagoDto));
    }
    @PutMapping
    public ResponseEntity<?> updatePago(@RequestBody PagoDto pagoDto){
        return ResponseEntity.status(HttpStatus.OK).body(pagoService.update(pagoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstadoPago(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", pagoService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
