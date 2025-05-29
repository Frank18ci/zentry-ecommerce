package com.zentry.api.controller.documentation;

import com.zentry.api.dto.UsuarioDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "Authentication", description = "Endpoints for user login")
public class AuthControllerDoc {

    @Operation(
            summary = "Login",
            description = "Authenticates a user and returns a JWT token",
            requestBody = @RequestBody(
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserLoginDTO.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Authentication success",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = LoginResponseDTO.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Invalid credentials"
                    )
            }
    )
    @PostMapping("/login")
    public void fakeLoginEndpoint() {
        throw new UnsupportedOperationException("This method is only for Swagger documentation");
    }
}

class UserLoginDTO {
    public String correoElectronico;
    public String contraseña;
}
class LoginResponseDTO {
    public String token;
    public String message;
    public User user;
}

