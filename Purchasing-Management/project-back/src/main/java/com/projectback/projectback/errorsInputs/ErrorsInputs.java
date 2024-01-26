package com.projectback.projectback.errorsInputs;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.BindingResult;

public class ErrorsInputs {
	
	public Map<String, String> validacionInputs(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            String campo = error.getField();
            String errMsj = error.getDefaultMessage();
            errors.put(campo, errMsj);
        });
        return errors;
    }

}
