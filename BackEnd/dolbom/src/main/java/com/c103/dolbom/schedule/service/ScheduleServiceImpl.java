package com.c103.dolbom.schedule.service;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.Entity.MemberClient;
import com.c103.dolbom.Entity.Schedule;
import com.c103.dolbom.client.MemberClientRepository;
import com.c103.dolbom.repository.MemberRepository;
import com.c103.dolbom.schedule.dto.ScheduleDto;
import com.c103.dolbom.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final MemberRepository memberRepository;

    private final MemberClientRepository memberClientRepository;

    @Override
    public long createSchedule(ScheduleDto scheduleDto) {

//        Member counselor = memberRepository.findById(scheduleDto.getCounselorId())
//                .orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));
//
//        Member client = memberRepository.findById(scheduleDto.getClientId())
//                .orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));;

        MemberClient memberClient = memberClientRepository.findByMemberIdAndClientId(scheduleDto.getCounselorId(), scheduleDto.getClientId())
                .orElseThrow(() -> new IllegalArgumentException("relation doesn't exist"));

        LocalDateTime startTime = setTimeFormat(scheduleDto.getStartTime());
        LocalDateTime endTime = setTimeFormat(scheduleDto.getEndTime());
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
    public long updateSchedule(ScheduleDto scheduleDto) {

        Schedule schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        schedule.updateSchedule(
                setTimeFormat(scheduleDto.getStartTime()), setTimeFormat(scheduleDto.getEndTime()), scheduleDto.getContent());

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
    public LocalDateTime setTimeFormat(String ISODateTime) {

        // 파씽 오류시 DateTimeParseException 예외 발생
        // 추후에 ControllerAdvice로 예외처리 필요
        LocalDateTime dateTime = LocalDateTime.from(
                Instant.from(
                        DateTimeFormatter.ISO_DATE_TIME.parse(ISODateTime)
                ).atZone(ZoneId.of("Asia/Seoul"))
        );

        return dateTime;
    }

}
