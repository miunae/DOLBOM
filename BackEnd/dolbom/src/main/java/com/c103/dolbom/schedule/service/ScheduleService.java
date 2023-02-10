package com.c103.dolbom.schedule.service;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.schedule.dto.ScheduleDto;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleService {

    ScheduleDto.Detail getScheduleDetail(long scheduleId);
    long createSchedule(ScheduleDto.Basic scheduleDto);

    LocalDateTime setISOToLocalDateTime(String ISODateTime);

    String setLocalDateTimeToISO(LocalDateTime localDateTime);

    long updateSchedule(ScheduleDto.Basic scheduleDto);

    long deleteSchedule(long scheduleId);

    List<ScheduleDto.Basic> getScheduleListByPeriod(Member member, String start, String end);
}
