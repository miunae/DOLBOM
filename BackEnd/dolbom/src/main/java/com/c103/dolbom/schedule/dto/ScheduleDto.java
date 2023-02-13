package com.c103.dolbom.schedule.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

public class ScheduleDto {

    @Getter
    @AllArgsConstructor
    public static class Id {
        private Long scheduleId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Basic {
        private Long scheduleId;
        private Long clientId;
        private String startTime;
        private String endTime;
        private String content;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Detail {

        private Long scheduleId;
        private Long counselorId;
        private Long clientId;
        private String startTime;
        private String endTime;
        private String content;
        private String title; // client Name
        private String clientName;

    }
}
