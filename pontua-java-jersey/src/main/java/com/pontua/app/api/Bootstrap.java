package com.pontua.app.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServlet;

import com.pontua.app.util.CustomFilter;

import io.swagger.annotations.AuthorizationScope;
import io.swagger.config.ConfigFactory;
import io.swagger.config.FilterFactory;
import io.swagger.models.Info;

public class Bootstrap extends HttpServlet {
  static {
    // do any additional initialization here, such as set your base path programmatically as such:
    // ConfigFactory.config().setBasePath("http://pontua-java.herokuapp.com/pontua");

    // add a custom filter
   // FilterFactory.setFilter(new CustomFilter());
    /*
     * 
     * LOGGING
     * */
    //org.apache.log4j.BasicConfigurator.configure();
    Info info = new Info(
      "Pontua API",                             /* title */
      "Pontos em promocao", 
      "http://pontua-java.herokuapp.com/pontua/api-docs",                  /* TOS URL */
      "",                            /* Contact */
      "Apache 2.0",                                     /* license */
      "http://www.apache.org/licenses/LICENSE-2.0.html" /* license URL */
    );

    List<AuthorizationScope> scopes = new ArrayList<AuthorizationScope>();
    scopes.add(new AuthorizationScope("email", "Access to your email address"));
    scopes.add(new AuthorizationScope("pets", "Access to your pets"));

    List<GrantType> grantTypes = new ArrayList<GrantType>();

    ImplicitGrant implicitGrant = new ImplicitGrant(
      new LoginEndpoint("http://pontua-java.herokuapp.com/pontua/login"), "access_code");

    grantTypes.add(implicitGrant);

    AuthorizationType oauth = new OAuthBuilder().scopes(scopes).grantTypes(grantTypes).build();

    ConfigFactory.config().addAuthorization(oauth);
    
    ConfigFactory.config().setApiInfo(info);
    
    
  }
}
