package com.zentry.api.service.impl;

import com.zentry.api.dto.OrdenDto;
import com.zentry.api.dto.OrdenItemDto;
import com.zentry.api.dto.ProductoVarianteDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.OrdenItem;
import com.zentry.api.repository.OrdenItemRepository;
import com.zentry.api.service.OrdenItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdenItemServiceImpl implements OrdenItemService {
    private final OrdenItemRepository ordenItemRepository;

    @Override
    public List<OrdenItemDto> list() {
        return OrdenItemDto.listOrderItemToListOrdenItemDto(ordenItemRepository.findAll());
    }

    @Override
    public Page<OrdenItemDto> listFiltro(int page, int size, String sortBy, String direction, String nombreUsuario) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<OrdenItem> ordenItems = ordenItemRepository.findByOrden_Usuario_NombreContaining(nombreUsuario, pageable);
        return ordenItems.map(OrdenItemDto::orderItemToOrdenItemDto);
    }

    @Override
    public OrdenItemDto findById(Long id) {
        return OrdenItemDto.orderItemToOrdenItemDto(ordenItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Orden Item no encontrado con id" + id)));
    }

    @Override
    public OrdenItemDto save(OrdenItemDto ordenItemDto) {
        OrdenItem ordenItem = OrdenItemDto.orderItemDtoToOrdenItem(ordenItemDto);
        OrdenItem ordenItemSaved = ordenItemRepository.save(ordenItem);
        return OrdenItemDto.orderItemToOrdenItemDto(ordenItemSaved);
    }

    @Override
    public OrdenItemDto update(OrdenItemDto ordenItemDto) {
        OrdenItem ordenItem = ordenItemRepository.findById(ordenItemDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Orden Item no encontrado con id" + ordenItemDto.getId()));

        ordenItem.setOrden(OrdenDto.ordenDtoToOrden(ordenItemDto.getOrden()));
        ordenItem.setProductoVariante(ProductoVarianteDto.productoVarienteDtoToProductoVariente(ordenItemDto.getProductoVariante()));
        ordenItem.setCantidad(ordenItemDto.getCantidad());
        ordenItem.setPrecioUnitario(ordenItemDto.getPrecioUnitario());

        OrdenItem ordenItemUpdated = ordenItemRepository.save(ordenItem);
        return OrdenItemDto.orderItemToOrdenItemDto(ordenItemUpdated);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        ordenItemRepository.deleteById(id);
        return "Orden Item con id " + id + " eliminado";
    }
}
