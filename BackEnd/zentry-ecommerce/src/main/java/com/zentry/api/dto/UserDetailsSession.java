package com.zentry.api.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
@Data
@Builder
public class UserDetailsSession {
    private Long id;
    private String password;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;
    private Boolean accountNonExpired;
    private Boolean accountNonLocked;
    private Boolean credentialsNonExpired;
    private Boolean enabled;
}
