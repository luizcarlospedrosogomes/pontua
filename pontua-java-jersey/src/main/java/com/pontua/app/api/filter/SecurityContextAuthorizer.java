/**
 * Created by Philip A Senger on November 10, 2015
 */

package com.pontua.app.api.filter;

import javax.security.auth.Subject;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import java.security.Principal;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SecurityContextAuthorizer implements SecurityContext {

    private Principal principal;
    private javax.inject.Provider<UriInfo> uriInfo;
    private Set<String> roles;
    private String role;
    
    public SecurityContextAuthorizer(final javax.inject.Provider<UriInfo> uriInfo, final Principal principal, final String role) {
        this.principal = principal;
        if (principal == null) {
            this.principal = new Principal() {
                @Override
                public String getName() {
                    return "anonymous";
                }

                @Override
                public boolean implies(Subject subject) {
                    return true;
                }
            };
        }
        this.uriInfo = uriInfo;
        this.role = role;//new HashSet<>(Arrays.asList((role != null) ? role : new String[]{}));
    }

    public Principal getUserPrincipal() {
        return this.principal;
    }

    public boolean isUserInRole(String role) {
        return this.role.contains(((role == null) ? "" : role));
    }

    public boolean isSecure() {
        return "https".equals(uriInfo.get().getRequestUri().getScheme());
    }

    public String getAuthenticationScheme() {
        return SecurityContext.DIGEST_AUTH;
    }
}
