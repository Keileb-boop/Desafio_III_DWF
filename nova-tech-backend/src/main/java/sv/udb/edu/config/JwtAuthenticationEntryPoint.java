package sv.udb.edu.config;

import jakarta.servlet.http.*;
import org.springframework.security.core.*;
import org.springframework.security.web.AuthenticationEntryPoint;
import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado: " + authException.getMessage());
    }
}
