package com.pontua.app.api;

import java.security.Key;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.glassfish.jersey.servlet.ServletContainer;


import com.pontua.app.api.filter.CORSFilter;
import com.pontua.app.api.filter.JWTSecurityFilter;

import io.jsonwebtoken.impl.crypto.MacProvider;

public class Main {
	private static Key key;
    
	public static void setKey(Key key) {
		Main.key = key;
	}

	public static Key getKey() {
        return key;
    }
	   
    private static ResourceConfig config(){
    	org.apache.log4j.BasicConfigurator.configure();
    	ResourceConfig config = new ResourceConfig();
 	 	config.register(new CORSFilter());
 	 	//config.register(new ApiOriginFilter());
   	 	config.packages("com.pontua.app.api.resources");
     	config.register(LoggingFilter.class);
	   	config.register(RolesAllowedDynamicFeature.class);
	   	config.register(JWTSecurityFilter.class);
	   	
	   	//config.register(JacksonFeature.class);
	   	Main.setKey(MacProvider.generateKey());
	   	config.register(new AbstractBinder() {
	        @Override
	        protected void configure() {
	                bind(getKey()).to(Key.class);
	        }
	    });
	    
	   //	config.property("jersey.config.beanValidation.enableOutputValidationErrorEntity.server", "true");
	   // config.property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);
	   	
	    return config;
    }
    
    @SuppressWarnings("deprecation")
	public static void main(String[] args) throws Exception {
    	ResourceConfig config = config();
   	 	ServletHolder servlet = new ServletHolder(new ServletContainer(config));
   	 	Server server = new Server(8080);
   	 	ServletContextHandler context = new ServletContextHandler(server, "/*");
   	 	context.addServlet(servlet, "/*");

   	 	try {
   	 		server.start();
   	 		server.join();
   	 	} finally {
   	 		server.destroy();
   	 	}
   	}
    
}
