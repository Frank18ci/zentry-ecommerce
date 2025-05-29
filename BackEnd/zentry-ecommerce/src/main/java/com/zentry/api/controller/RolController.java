package com.zentry.api.controller;

import com.zentry.api.dto.EstadoProductoDto;
import com.zentry.api.dto.RolDto;
import com.zentry.api.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("rol")
public class RolController {
    private final RolService rolService;

    @GetMapping
    public ResponseEntity<?> getRol() {
        return ResponseEntity.status(HttpStatus.OK).body(rolService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getRolPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(rolService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getRolById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(rolService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveRol(@RequestBody RolDto rolDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(rolService.save(rolDto));
    }
    @PutMapping
    public ResponseEntity<?> updateRol(@RequestBody RolDto rolDto){
        return ResponseEntity.status(HttpStatus.OK).body(rolService.update(rolDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRol(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", rolService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
