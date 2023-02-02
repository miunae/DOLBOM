package com.c103.dolbom.Entity;

import com.c103.dolbom.Entity.BaseEntity;
import com.c103.dolbom.Entity.MemberClient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Drive extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "member_client_id")
    private MemberClient memberClient;

    @Column(length = 45)
    private String originName;
    @Column(length = 45)
    private String savedName;
    @Column(columnDefinition = "text")
    private String path;

}
