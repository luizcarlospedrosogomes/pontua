package com.pontua.app.api;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

public class Main {
//    public static final String BASE_URI = "http://localhost:8080/pontua";
    @SuppressWarnings("deprecation")
	public static void main(String[] args) throws Exception {
    	org.apache.log4j.BasicConfigurator.configure();
    	ResourceConfig config = new ResourceConfig();
   	 	config.packages("com.pontua.app.api.resources");
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
