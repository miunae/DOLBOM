package com.c103.dolbom.openvidu.controller;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.ClientService;
import com.c103.dolbom.client.dto.ClientDto;
import com.c103.dolbom.openvidu.dto.*;
import com.c103.dolbom.openvidu.service.ConferenceService;
import com.c103.dolbom.openvidu.service.MailService;
import com.c103.dolbom.user.auth.PrincipalDetails;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;

//@CrossOrigin(origins = "*")
@RequestMapping("api")
@RestController
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @Autowired
    ClientService clientService;

    @Autowired
    MailService mailService;

    /**
     * Session 생성
     * @param params The CLIENT's id
     * @param params The Session properties
     * @return The Session ID, The Conferece ID (JSON 형태)
     */
    @PostMapping("/conference")
    public ResponseEntity<?> initializeSession(@RequestBody(required = false) Map<String, Object> params,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("111"+params.get("clientId"));
        Long clientId = Long.parseLong(String.valueOf(params.get("clientId")));
        ClientDto client = clientService.getClient(clientId);
        Long counselorId = principalDetails.getMember().getId();
        String sessionId = String.valueOf(counselorId);
        // Conference DB 및 MemberConference DB에 저장
        Long conferenceId = conferenceService.createConference(counselorId,sessionId);
        MailDto mailDto = MailDto.builder()
                .email(client.getEmail())
                .title("DOLBOM 화상회의 초대 링크 전송")
                .conferenceId(conferenceId)
                .link("http://localhost:3000/clientcheck")
                .sessionId(sessionId)
                .build();
        // 내담자에게 이메일 발송
        mailService.sendEmail(mailDto);
        CreateSessionResDto dto = CreateSessionResDto.builder()
                .conferenceId(conferenceId)
                .sessionId(sessionId)
                .build();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    /**
     * 상담사 방 참가
     * @param sessionId The Session in which to create the Connection
     * @return The Token associated to the Connection
     */
//    @PostMapping("/conference/{sessionId}/connections")
//    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
//                                                   @RequestBody(required = false) Map<String, Object> params) {
//        System.out.println("상담사 연결되었음");
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    /**
     * 내담자 방 참가
//     * @param sessionId The Session in which to create the Connection
     * @param dto    내담자 이름, 이메일, 참여할 참여코드, 회의 ID

     * @return The Token associated to the Connection
     */
    @PostMapping("/connections/conference/client")
    public ResponseEntity<String> createClientConnection(@RequestBody JoinSessionDto dto,
                                                         @RequestBody(required = false) Map<String, Object> params) {
        // MemberConferece DB 저장 및 ConferenceHistory DB 저장
        Long memberConferenceId = conferenceService.createMemberConference(dto);
        if(memberConferenceId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("내담자 연결되었음");
//        Recording recording = openvidu.startRecording(session.getSessionId(),recordingProperties);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 회의 메모 파일 저장
     * @param dto The Conferece ID, 메모 내용(textarea로 넘김)
     * @return OK, FAIL
     */
    @PostMapping("/conference/memo")
    public ResponseEntity<?> saveMemo(@RequestBody MemoDto dto) {
        int res = conferenceService.saveMemo(dto);
        if(res == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 회의 STT 파일 저장
     * @param dto The Conferece ID, File Path
     * @param file The STT record file --> 음성파일 1분 미만
     */
    @PostMapping("/api/conference/stt")
    public ResponseEntity<?> saveStt(@RequestPart MultipartFile file, @RequestBody SttDto dto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 녹음 시작
     */



}