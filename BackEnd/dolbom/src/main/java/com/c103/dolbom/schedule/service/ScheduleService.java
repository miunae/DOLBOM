package com.c103.dolbom.schedule.service;

import com.c103.dolbom.schedule.dto.ScheduleDto;

import java.time.LocalDateTime;

public interface ScheduleService {

    long createSchedule(ScheduleDto scheduleDto);

    LocalDateTime setTimeFormat(String ISODateTime);

    long updateSchedule(ScheduleDto scheduleDto);

    long deleteSchedule(long scheduleId);
}
