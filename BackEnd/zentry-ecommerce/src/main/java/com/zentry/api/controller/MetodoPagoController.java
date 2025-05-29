package com.zentry.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zentry.api.dto.MetodoPagoDto;
import com.zentry.api.service.MetodoPagoService;

import lombok.RequiredArgsConstructor;

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
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/metodoPago")
public class MetodoPagoController {
	private final MetodoPagoService metodoPagoService;
	
	@GetMapping
    public ResponseEntity<?> getMetodoPago() {
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoService.list());
    }

	
	@GetMapping("/page")
    public ResponseEntity<?> getMetodoPagoPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoService.listFiltro(page, size, sortBy, direction, nombre));
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<?> getMetodoPagoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveMetodoPago(@RequestBody MetodoPagoDto metodoPagoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(metodoPagoService.save(metodoPagoDto));
    }
    @PutMapping
    public ResponseEntity<?> updateMetodoPago(@RequestBody MetodoPagoDto metodoPagoDto){
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoService.update(metodoPagoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMetodoPago(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", metodoPagoService.delete(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
	
}
