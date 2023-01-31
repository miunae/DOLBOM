package com.c103.dolbom.client.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ClientJoinDto {
    private Long id;
    private String name;
    private String email;
    private String phone;

    private LocalDate birth;
}
