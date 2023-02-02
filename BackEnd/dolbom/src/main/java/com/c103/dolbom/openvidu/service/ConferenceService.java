package com.c103.dolbom.openvidu.service;

import com.c103.dolbom.openvidu.repository.ConferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public interface ConferenceService {

    Long createConference(Long memberId, String sessionId);
    Long createMemberConference(String email, String sessionId);
    Long createConferenceHistory(Long clientId, Long conferenceId);


}
