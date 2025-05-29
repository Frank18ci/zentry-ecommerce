package com.zentry.api.controller;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.service.ComentarioProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comentarioProducto")
public class ComentarioProductoController {
    private final ComentarioProductoService comentarioProductoService;

    @GetMapping
    public ResponseEntity<?> getComentarioProducto() {
        return ResponseEntity.status(HttpStatus.OK).body(comentarioProductoService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getComentarioProductoPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "calificacion") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "") String nombreUsuario
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(comentarioProductoService.listFiltro(page, size, sortBy, direction, nombreUsuario));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoriaById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(comentarioProductoService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveComentarioProducto(@RequestBody ComentarioProductoDto comentarioProductoDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(comentarioProductoService.save(comentarioProductoDto));
    }
    @PutMapping
    public ResponseEntity<?> updateComentarioProducto(@RequestBody ComentarioProductoDto comentarioProductoDto){
        return ResponseEntity.status(HttpStatus.OK).body(comentarioProductoService.update(comentarioProductoDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComentarioProducto(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", comentarioProductoService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
