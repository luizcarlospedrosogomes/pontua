/**
 * Created by Philip A Senger on November 10, 2015
 */
package com.pontua.app.api;


import java.security.Key;

import javax.ws.rs.ApplicationPath;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import com.pontua.app.api.filter.CORSFilter;
import com.pontua.app.api.filter.JWTSecurityFilter;

import io.jsonwebtoken.impl.crypto.MacProvider;

@ApplicationPath("/")
public class Application extends ResourceConfig { // implements ContextResolver<ObjectMapper> {

 
    private static Key key;
    public Application(){
    	setKey(MacProvider.generateKey());
    	  // Validation.
        // register(ValidationConfigurationContextResolver.class);
        // logging
        register(LoggingFilter.class);
        // roles security
        register(RolesAllowedDynamicFeature.class);
        // jwt filter
        register(JWTSecurityFilter.class);
        // turn on Jackson, Moxy isn't that good of a solution.
        register(JacksonFeature.class);
        //register(CORSFilter.class);
        packages("com.pontua.app.api.resources");

        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bind(getKey()).to(Key.class);
            }
        });
        property("jersey.config.beanValidation.enableOutputValidationErrorEntity.server", "true");
        property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);
    }
    public Application(final Key key) {
        
      
      
          }

    public Key getKey() {
        return key;
    }

    public void setKey(Key key) {
        this.key = key;
    }

//    @Override
//    public ObjectMapper getContext(Class<?> type) {
//        return null;
//    }


}
