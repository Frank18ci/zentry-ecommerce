package com.zentry.api.controller;

import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.DireccionDto;
import com.zentry.api.service.DireccionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("direccion")
@RequiredArgsConstructor
public class DireccionController {
    private final DireccionService direccionService;

    @GetMapping
    public ResponseEntity<?> getDireccion() {
        return ResponseEntity.status(HttpStatus.OK).body(direccionService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getDireccionPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "direccion") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "") String direccion
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(direccionService.listFiltro(page, size, sortBy, direction, direccion));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDireccionById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(direccionService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveDireccion(@RequestBody DireccionDto direccionDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(direccionService.save(direccionDto));
    }
    @PutMapping
    public ResponseEntity<?> updateDireccion(@RequestBody DireccionDto direccionDto){
        return ResponseEntity.status(HttpStatus.OK).body(direccionService.update(direccionDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDireccion(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", direccionService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
