package io.swagger.api;

import io.swagger.api.*;
import io.swagger.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;


import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-08T17:54:13.788Z")
public abstract class LogoutApiService {
    public abstract Response logoutCliente( @NotNull String token,SecurityContext securityContext) throws NotFoundException;
    public abstract Response logoutRepresentante( @NotNull String token,SecurityContext securityContext) throws NotFoundException;
}
