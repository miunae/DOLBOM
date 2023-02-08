package com.c103.dolbom.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Getter
@Entity(name = "member_client")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberClient extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Member client;


}
