package com.c103.dolbom.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Entity(name="schedule")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Schedule extends BaseTimeEntity{

    @ManyToOne
    @JoinColumn(name = "id")
    private MemberClient memberClient;

    @Column(name="start_time")
    private LocalDateTime startTime;
    @Column(name="end_time")
    LocalDateTime endTime;
    @Column(columnDefinition = "text")
    private String content;

}
