package com.c103.dolbom.schedule.dto;


import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {

    Long scheduleId;
    Long counselorId;
    Long clientId;
    String startTime;
    String endTime;
    String content;
}
