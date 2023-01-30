package com.c103.dolbom.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Member extends BaseTimeEntity{
    @Column(nullable = false, updatable = false, length = 45)
    private String email;
    @Column(nullable = false, length = 45)
    private String password;
    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private Role role;
    @Lob
    private String content;
    @Column
    private LocalDate birth;
    @Column(nullable = false)
    private String phone;



}
