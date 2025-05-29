package com.zentry.api.service.impl;

import com.zentry.api.dto.RolDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Rol;
import com.zentry.api.repository.RolRepository;
import com.zentry.api.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RolServiceImpl implements RolService {
    private final RolRepository rolRepository;

    @Override
    public List<RolDto> list() {
        return RolDto.listRolToListRolDto(rolRepository.findAll());
    }

    @Override
    public Page<RolDto> listFiltro(int page, int size, String sortBy, String direction, String nombre) {
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
            sortDirection = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(sortDirection, sortBy);
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<Rol> rols = rolRepository.findByNombreContaining(nombre, pageable);
        return rols.map(RolDto::rolToRolDto);
    }

    @Override
    public RolDto findById(Long id) {
        return RolDto.rolToRolDto(rolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Rol no encontrado con id " + id)));
    }

    @Override
    public RolDto save(RolDto rolDto) {
        Rol rol = RolDto.rolDtoToRol(rolDto);
        Rol rolSaved = rolRepository.save(rol);
        return RolDto.rolToRolDto(rolSaved);
    }

    @Override
    public RolDto update(RolDto rolDto) {
        Rol rol = rolRepository.findById(rolDto.getId())
                .orElseThrow(() -> new ResourceNotFound("Rol no encontrado con id " + rolDto.getId()));

        rol.setNombre(rolDto.getNombre());

        Rol rolSaved = rolRepository.save(rol);
        return RolDto.rolToRolDto(rolSaved);
    }

    @Override
    public String deleteById(Long id) {
        if(id == null){
            throw new BadRequestParam("Falta el dato id");
        }
        rolRepository.deleteById(id);
        return "Rol con id " + id + " eliminado";
    }
}
