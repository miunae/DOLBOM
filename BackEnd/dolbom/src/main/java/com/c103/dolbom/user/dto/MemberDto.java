package com.c103.dolbom.user.dto;


import com.c103.dolbom.Entity.Role;
import com.nimbusds.jose.shaded.json.annotate.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    Long id;

    LocalDateTime createAt;

    LocalDateTime modifiedAt;

    String email;

    String password;

    String name;

    Role role;

    String content;

    LocalDate birth;

    String phone;
}
