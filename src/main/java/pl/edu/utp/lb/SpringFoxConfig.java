package pl.edu.utp.lb;

import java.util.ArrayList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 *
 * @author Artur Mokosa
 */
@Configuration
public class SpringFoxConfig {

    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(new ApiInfo(
                "Log Book", "TO DO: descryption", "1.0.0", "",
                new Contact("", "", ""),
                "", "", 
                new ArrayList<>())
        );
    }
}
