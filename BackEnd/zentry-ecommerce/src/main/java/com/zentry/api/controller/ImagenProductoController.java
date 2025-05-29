package com.zentry.api.controller;


import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.ImagenProductoDto;
import com.zentry.api.service.ImagenProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("imagenProducto")
@RequiredArgsConstructor
public class ImagenProductoController {
    private final ImagenProductoService imagenProductoService;

    @GetMapping
    public ResponseEntity<?> getImagenProducto() {
        return ResponseEntity.status(HttpStatus.OK).body(imagenProductoService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getImagenProductoPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "") String nombreProducto
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(imagenProductoService.listFiltro(page, size, sortBy, direction, nombreProducto));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getImagenProductoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(imagenProductoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveImagenProducto(@RequestBody ImagenProductoDto imagenProductoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(imagenProductoService.save(imagenProductoDto));
    }
    @PutMapping
    public ResponseEntity<?> updateImagenProducto(@RequestBody ImagenProductoDto imagenProductoDto){
        return ResponseEntity.status(HttpStatus.OK).body(imagenProductoService.update(imagenProductoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImagenProducto(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", imagenProductoService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
