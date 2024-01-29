package com.projectback.projectback.errorsInputs;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.BindingResult;

public class ErrorsInputs {
	
	public Map<String, String> validacionInputs(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();

        bindingResult.getFieldErrors().forEach((error) -> {
            String field = error.getField();
            String errMsg = error.getDefaultMessage();
            errors.put(field, errMsg);
        });
        return errors;
    }

}
