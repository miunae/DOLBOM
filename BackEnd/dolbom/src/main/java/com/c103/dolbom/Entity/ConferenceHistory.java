package com.c103.dolbom.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "conference_history")
@EntityListeners(value = AuditingEntityListener.class)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConferenceHistory extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    Member client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counselor_id")
    Member counselor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    Conference conference;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime insertedTime;

    private LocalDateTime endedTime;

    @Column(length = 45)
    private String memoOriginName;

    @Column(length = 45)
    private String memoSavedName;

    @Column(columnDefinition="text")
    private String memoPath;

    @Column(length = 45)
    private String sttOriginName;

    @Column(length = 45)
    private String sttSavedName;

    @Column(columnDefinition="text")
    private String sttPath;


}