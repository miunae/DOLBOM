package com.c103.dolbom.schedule.dto;


import lombok.*;

public class ScheduleDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Basic {
        private Long scheduleId;
        private Long counselorId;
        private Long clientId;
        private String startTime;
        private String endTime;
        private String content;
    }


    @Getter
    @AllArgsConstructor
    @Builder
    public static class Detail {

        private Long scheduleId;
        private Long counselorId;
        private Long clientId;
        private String startTime;
        private String endTime;
        private String content;
        private String counselorName;
        private String clientName;

    }
}
