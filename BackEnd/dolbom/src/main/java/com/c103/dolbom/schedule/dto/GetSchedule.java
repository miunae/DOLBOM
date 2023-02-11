package com.c103.dolbom.schedule.dto;

import java.time.LocalDateTime;

public interface GetSchedule {

    long getScheduleId();
    long getCounselorId();
    long getClientId();

    String getStartTime();
    String getEndTime();
    String getContent();
}
