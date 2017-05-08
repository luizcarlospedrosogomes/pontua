package io.swagger.api.factories;

import io.swagger.api.LogoutApiService;
import io.swagger.api.impl.LogoutApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-08T17:54:13.788Z")
public class LogoutApiServiceFactory {
    private final static LogoutApiService service = new LogoutApiServiceImpl();

    public static LogoutApiService getLogoutApi() {
        return service;
    }
}
