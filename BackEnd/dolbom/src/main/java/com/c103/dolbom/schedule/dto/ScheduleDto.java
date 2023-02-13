package com.c103.dolbom.schedule.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.nimbusds.jose.shaded.json.annotate.JsonIgnore;
import lombok.*;

public class ScheduleDto {

    @Getter
    @AllArgsConstructor
    public static class Id {
        private Long scheduleId;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
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
<<<<<<< Updated upstream
        private String counselorName;
        private String clientName;
=======
        private String counselorName; // client Name
        private String title;
>>>>>>> Stashed changes

    }
}
