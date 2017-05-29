package com.pontua.app.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServlet;

import com.pontua.app.util.CustomFilter;
import com.wordnik.swagger.config.ConfigFactory;
import com.wordnik.swagger.config.FilterFactory;
import com.wordnik.swagger.model.ApiInfo;
import com.wordnik.swagger.model.AuthorizationScope;
import com.wordnik.swagger.model.AuthorizationType;
import com.wordnik.swagger.model.GrantType;
import com.wordnik.swagger.model.ImplicitGrant;
import com.wordnik.swagger.model.LoginEndpoint;
import com.wordnik.swagger.model.OAuthBuilder;

public class Bootstrap extends HttpServlet {
  static {
    // do any additional initialization here, such as set your base path programmatically as such:
     //ConfigFactory.config().setBasePath("/pontua");

    // add a custom filter
    FilterFactory.setFilter(new CustomFilter());
    /*
     * 
     * LOGGING
     * */
    //org.apache.log4j.BasicConfigurator.configure();
    ApiInfo info = new ApiInfo(
      "Pontua API",                             /* title */
      "pontos em promocao", 
      "http://localhost:8080/pontua/ui",                  /* TOS URL */
      "",                            /* Contact */
      "Apache 2.0",                                     /* license */
      "http://www.apache.org/licenses/LICENSE-2.0.html" /* license URL */
    );

    List<AuthorizationScope> scopes = new ArrayList<AuthorizationScope>();
    scopes.add(new AuthorizationScope("email", "Access to your email address"));
    scopes.add(new AuthorizationScope("pets", "Access to your pets"));

    List<GrantType> grantTypes = new ArrayList<GrantType>();

    ImplicitGrant implicitGrant = new ImplicitGrant(
      new LoginEndpoint("http://localhost:8080/pontua/login"), "access_code");

    grantTypes.add(implicitGrant);

    AuthorizationType oauth = new OAuthBuilder().scopes(scopes).grantTypes(grantTypes).build();

    ConfigFactory.config().addAuthorization(oauth);
    ConfigFactory.config().setApiInfo(info);
    
    
  }
}
