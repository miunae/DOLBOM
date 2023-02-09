package com.c103.dolbom.schedule.service;

import com.c103.dolbom.Entity.MemberClient;
import com.c103.dolbom.Entity.Schedule;
import com.c103.dolbom.client.MemberClientRepository;
import com.c103.dolbom.schedule.dto.ScheduleDto;
import com.c103.dolbom.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final MemberClientRepository memberClientRepository;

    @Override
    public ScheduleDto.Detail getScheduleDetail(long scheduleId) {

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        MemberClient mc = memberClientRepository.findById(schedule.getMemberClientId().getId())
                .orElseThrow(() -> new IllegalArgumentException("relation doesn't exist"));

        // 나중에 Member 테이블로 들어가는 쿼리 2방(내담자, 상담자)을 1방으로 줄일 수도 있을듯
        ScheduleDto.Detail detailScheduleDto = ScheduleDto.Detail.builder()
                .scheduleId(schedule.getId())
                .counselorId(mc.getMember().getId())
                .clientId(mc.getClient().getId())
                .startTime(setLocalDateTimeToISO(schedule.getStartTime()))
                .endTime(setLocalDateTimeToISO(schedule.getEndTime()))
                .content(schedule.getContent())
                .clientName(mc.getClient().getName())
                .counselorName(mc.getMember().getName())
                .build();
        return detailScheduleDto;
    }

    @Override
    public long createSchedule(ScheduleDto.Basic scheduleDto) {

        MemberClient memberClient = memberClientRepository.findByMemberIdAndClientId(scheduleDto.getCounselorId(), scheduleDto.getClientId())
                .orElseThrow(() -> new IllegalArgumentException("relation doesn't exist"));

        LocalDateTime startTime = setISOToLocalDateTime(scheduleDto.getStartTime());
        LocalDateTime endTime = setISOToLocalDateTime(scheduleDto.getEndTime());

        Schedule schedule = Schedule.builder()
                .memberClientId(memberClient)
                .startTime(startTime)
                .endTime(endTime)
                .content(scheduleDto.getContent())
                .build();

        schedule = scheduleRepository.save(schedule);
        return schedule.getId();
    }

    @Override
    public long updateSchedule(ScheduleDto.Basic scheduleDto) {

        Schedule schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        schedule.updateSchedule(
                setISOToLocalDateTime(scheduleDto.getStartTime()), setISOToLocalDateTime(scheduleDto.getEndTime()), scheduleDto.getContent());

        scheduleRepository.save(schedule);
        return schedule.getId();
    }

    @Override
    public long deleteSchedule(long scheduleId) {

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));
        scheduleRepository.delete(schedule);

        return scheduleId;
    }

    @Override
    public LocalDateTime setISOToLocalDateTime(String ISODateTime) {

        // 파씽 오류시 DateTimeParseException 예외 발생
        // 추후에 ControllerAdvice로 예외처리 필요

        // 한국 시간으로 파싱하는 경우
//        LocalDateTime dateTime = LocalDateTime.from(
//                Instant.from(
//                        DateTimeFormatter.ISO_DATE_TIME.parse(ISODateTime)
//                ).atZone(ZoneId.of("Asia/Seoul"))
//        );

        Instant instant = Instant.parse(ISODateTime);

        //Convert instant to LocalDateTime, no timezone, add a zero offset / UTC+0
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);

        return dateTime;
    }

    @Override
    public String setLocalDateTimeToISO(LocalDateTime localDateTime) {

//        String ISOTime = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(localDateTime);
        Instant instant = localDateTime.toInstant(ZoneOffset.UTC);
        String ISOTime = instant.toString();
        return ISOTime;
    }

}
