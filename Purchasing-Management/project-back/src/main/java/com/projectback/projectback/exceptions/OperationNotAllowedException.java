package com.projectback.projectback.exceptions;

@SuppressWarnings("serial")
public class OperationNotAllowedException extends RuntimeException {

    public OperationNotAllowedException(String message) {
        super(message);
    }
}