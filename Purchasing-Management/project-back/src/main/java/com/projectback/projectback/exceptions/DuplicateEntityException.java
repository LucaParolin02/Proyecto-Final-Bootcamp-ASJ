package com.projectback.projectback.exceptions;

@SuppressWarnings("serial")
public class DuplicateEntityException extends RuntimeException {

    public DuplicateEntityException(String message) {
        super(message);
    }
}