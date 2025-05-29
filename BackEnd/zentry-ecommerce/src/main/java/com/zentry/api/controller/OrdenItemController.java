package com.zentry.api.controller;

import com.zentry.api.dto.ComentarioProductoDto;
import com.zentry.api.dto.OrdenItemDto;
import com.zentry.api.service.OrdenItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("ordenItem")
@RequiredArgsConstructor
public class OrdenItemController {
    private final OrdenItemService ordenItemService;
    @GetMapping
    public ResponseEntity<?> getOrdenItem() {
        return ResponseEntity.status(HttpStatus.OK).body(ordenItemService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getOrdenItemPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombreUsuario
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(ordenItemService.listFiltro(page, size, sortBy, direction, nombreUsuario));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrdenItemById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(ordenItemService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveOrdenItem(@RequestBody OrdenItemDto ordenItemDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenItemService.save(ordenItemDto));
    }
    @PutMapping
    public ResponseEntity<?> updateOrdenItem(@RequestBody OrdenItemDto ordenItemDto){
        return ResponseEntity.status(HttpStatus.OK).body(ordenItemService.update(ordenItemDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrdenItem(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", ordenItemService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
