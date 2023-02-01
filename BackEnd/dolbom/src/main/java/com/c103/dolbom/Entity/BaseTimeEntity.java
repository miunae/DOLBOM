package com.c103.dolbom.Entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class BaseTimeEntity extends BaseEntity{

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;
}
