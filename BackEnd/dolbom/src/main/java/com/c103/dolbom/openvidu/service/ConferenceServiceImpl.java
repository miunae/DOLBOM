package com.c103.dolbom.openvidu.service;

import com.c103.dolbom.Entity.Conference;
import com.c103.dolbom.Entity.ConferenceHistory;
import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.Entity.MemberConference;
import com.c103.dolbom.openvidu.dto.JoinSessionDto;
import com.c103.dolbom.openvidu.repository.ConferenceHistoryRepository;
import com.c103.dolbom.openvidu.repository.ConferenceRepository;
import com.c103.dolbom.openvidu.repository.MemberConferenceRepository;
import com.c103.dolbom.repository.MemberRepository;
import org.hibernate.mapping.Join;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConferenceServiceImpl implements ConferenceService {

    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberConferenceRepository memberConferenceRepository;

    @Autowired
    ConferenceHistoryRepository conferenceHistoryRepository;

    @Override
    public Long createConference(Long memberId, String sessionId) {
        Member entityMember = memberRepository.findById(memberId).get();
        Conference entityConference = Conference.builder()
                .member(entityMember)
                .sessionId(sessionId)
                .build();
        Long conferenceId = conferenceRepository.save(entityConference).getId();

        MemberConference memberConference = MemberConference.builder()
                .member(entityMember)
                .conference(entityConference)
                .build();
        memberConferenceRepository.save(memberConference);
        return conferenceId;
    }

    // 내담자가 세션에 연결했을때
    // 리턴 값: memberConferenceId
    @Override
    public Long createMemberConference(JoinSessionDto dto) {
        Optional<Member> optionalClient = memberRepository.findByEmail(dto.getEmail());
        Member entityClient;
        if(optionalClient.isPresent()){
            entityClient = optionalClient.get();
        } else {
            return null;
        }
        Conference entityConference = conferenceRepository.findById(dto.getConferenceId()).get();

        MemberConference memberConference = MemberConference.builder()
                .member(entityClient)
                .conference(entityConference)
                .build();
        Long memberConferenceId = memberConferenceRepository.save(memberConference).getId();

        Member entityCounselor = entityConference.getMember();

        ConferenceHistory entityConferenceHistory = ConferenceHistory.builder()
                .client(entityClient)
                .counselor(entityCounselor)
                .conference(entityConference)
                .build();

        Long conferenceHistoryId = conferenceHistoryRepository.save(entityConferenceHistory).getId();
        return memberConferenceId;
    }

    @Override
    public Long recordConferenceHistory(Long clientId, Long conferenceId) {
        return null;
    }
}
