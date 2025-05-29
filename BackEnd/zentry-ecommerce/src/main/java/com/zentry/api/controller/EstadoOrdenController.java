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

import com.zentry.api.dto.EstadoOrdenDto;
import com.zentry.api.service.EstadoOrdenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/estadoOrden")
public class EstadoOrdenController {
	private final EstadoOrdenService estadoOrdenService;
	
	@GetMapping
    public ResponseEntity<?> getEstadoOrden() {
        return ResponseEntity.status(HttpStatus.OK).body(estadoOrdenService.list());
    }
	
	@GetMapping("/page")
    public ResponseEntity<?> getEstadoOrdenPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(estadoOrdenService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEstadoOrdenById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(estadoOrdenService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveEstadoOrden(@RequestBody EstadoOrdenDto estadoOrdenDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(estadoOrdenService.save(estadoOrdenDto));
    }
    @PutMapping
    public ResponseEntity<?> updateEstadoOrden(@RequestBody EstadoOrdenDto estadoOrdenDto){
        return ResponseEntity.status(HttpStatus.OK).body(estadoOrdenService.update(estadoOrdenDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstadoOrden(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", estadoOrdenService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }

}
