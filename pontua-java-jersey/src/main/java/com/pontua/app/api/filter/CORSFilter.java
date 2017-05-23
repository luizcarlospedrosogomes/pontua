package com.pontua.app.api.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

@Provider
public class CORSFilter implements ContainerResponseFilter {

	private static final String AC_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
	private static final String AC_ALLOW_ORIGIN_VAL = "*";

	private static final String AC_ALLOW_METHODS = "Access-Control-Allow-Methods";
	private static final String AC_ALLOW_METHODS_VAL = "GET, POST, PUT, DELETE";

	private static final String AC_ALLOW_HEADERS = "Access-Control-Allow-Headers";
	private static final String AC_ALLOW_HEADERS_VAL = "X-Requested-With,Origin,Content-Type, Accept";

	@Override
	public void filter(ContainerRequestContext requestContext,
			ContainerResponseContext responseContext) throws IOException {

		MultivaluedMap<String, Object> respHead = responseContext.getHeaders();

		respHead.putSingle(AC_ALLOW_ORIGIN, AC_ALLOW_ORIGIN_VAL);

		if ("OPTIONS".equals(requestContext.getMethod())) {

			respHead.putSingle(AC_ALLOW_METHODS, AC_ALLOW_METHODS_VAL);
			respHead.putSingle(AC_ALLOW_HEADERS, AC_ALLOW_HEADERS_VAL);

		}
	}

}