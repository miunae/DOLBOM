package com.c103.dolbom.schedule.controller;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.Entity.Role;
import com.c103.dolbom.repository.MemberRepository;
import com.c103.dolbom.schedule.dto.ScheduleDto;
import com.c103.dolbom.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    private final MemberRepository memberRepository;
    // 스케줄 등록
    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDto scheduleDto) {

        long scheduleId = scheduleService.createSchedule(scheduleDto);

        return ResponseEntity.ok(scheduleId);
    }

//    @PostConstruct
//    public void init() {
//        Member member1 = Member.builder()
//                .email("ssafy1@ssafy")
//                .name("kim")
//                .password("fasdfa")
//                .phone("01001010101")
//                .role(Role.COUNSELOR)
//                .build();
//
//        Member member2 = Member.builder()
//                .email("nana@naver.com")
//                .name("park")
//                .password("fasdfa")
//                .phone("01022220101")
//                .role(Role.CLIENT)
//                .build();
//
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//    }
}
