package com.c103.dolbom.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ConferenceHistory extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    Conference conference;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime insertedTime;



}
