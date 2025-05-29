package com.zentry.api.controller;

import com.zentry.api.dto.DireccionDto;
import com.zentry.api.dto.EstadoProductoDto;
import com.zentry.api.service.EstadoProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("estadoProducto")
public class EstadoProductoController {
    private final EstadoProductoService estadoProductoService;

    @GetMapping
    public ResponseEntity<?> getEstadoProducto() {
        return ResponseEntity.status(HttpStatus.OK).body(estadoProductoService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getEstadoProductoPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(estadoProductoService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getEstadoProductoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(estadoProductoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveEstadoProducto(@RequestBody EstadoProductoDto estadoProductoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(estadoProductoService.save(estadoProductoDto));
    }
    @PutMapping
    public ResponseEntity<?> updateEstadoProducto(@RequestBody EstadoProductoDto estadoProductoDto){
        return ResponseEntity.status(HttpStatus.OK).body(estadoProductoService.update(estadoProductoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstadoProducto(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", estadoProductoService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
