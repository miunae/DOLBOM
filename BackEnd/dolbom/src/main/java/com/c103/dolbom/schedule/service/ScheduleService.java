package com.c103.dolbom.schedule.service;

import com.c103.dolbom.schedule.dto.ScheduleDto;

import java.time.LocalDateTime;

public interface ScheduleService {

    ScheduleDto.Detail getScheduleDetail(long scheduleId);
    long createSchedule(ScheduleDto.Basic scheduleDto);

    LocalDateTime setISOToLocalDateTime(String ISODateTime);

    String setLocalDateTimeToISO(LocalDateTime localDateTime);

    long updateSchedule(ScheduleDto.Basic scheduleDto);

    long deleteSchedule(long scheduleId);
}
