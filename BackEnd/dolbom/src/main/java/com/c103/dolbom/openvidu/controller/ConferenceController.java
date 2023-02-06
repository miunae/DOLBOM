package com.c103.dolbom.openvidu.controller;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.ClientService;
import com.c103.dolbom.client.dto.ClientDto;
import com.c103.dolbom.openvidu.dto.CreateSessionResDto;
import com.c103.dolbom.openvidu.dto.JoinSessionDto;
import com.c103.dolbom.openvidu.dto.MailDto;
import com.c103.dolbom.openvidu.dto.MemoDto;
import com.c103.dolbom.openvidu.service.ConferenceService;
import com.c103.dolbom.openvidu.service.MailService;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @Autowired
    ClientService clientService;

    @Autowired
    MailService mailService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * Session 생성
     * @param params The CLIENT's id
     * @param params The Session properties
     * @param id The COUNSELOR's id
     * @return The Session ID, The Conferece ID (JSON 형태)
     */
    @PostMapping("/api/sessions/{id}")
    public ResponseEntity<?> initializeSession(@RequestBody(required = false) Map<String, Object> params
                                                    ,@PathVariable("id") String id)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Long clientId = Long.parseLong(String.valueOf(params.get("clientId")));
        String sessionId = (String)params.get("customSessionId");
        ClientDto client = clientService.getClient(clientId);
        Long counselorId = Long.parseLong(String.valueOf(id));
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
        if(mailService.sendEmail(mailDto) == 1) {
            System.out.println("메일 발송 완료");
        }
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
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
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        System.out.println("상담사 연결되었음");
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    /**
     * 내담자 방 참가
     * @param sessionId The Session in which to create the Connection
     * @param dto    내담자 이름, 이메일, 참여할 참여코드, 회의 ID

     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/client/connections")
    public ResponseEntity<String> createClientConnection(@PathVariable("sessionId") String sessionId,
                                                         @RequestBody JoinSessionDto dto,
                                                         @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        // MemberConferece DB 저장 및 ConferenceHistory DB 저장
        Long memberConferenceId = conferenceService.createMemberConference(dto);
        if(memberConferenceId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("내담자 연결되었음");
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        System.out.println("Token: "+ connection.getToken());
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    /**
     * 회의 메모 파일 저장
     * @param dto The Conferece ID, 메모 내용(textarea로 넘김)
     * @return OK, FAIL
     */
    @PostMapping("/api/sessions/memo")
    public ResponseEntity<?> saveMemo(@RequestBody MemoDto dto) {
        conferenceService.saveMemo(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 회의 STT 파일 저장
     * @param dto The Conferece ID, STT 음성 파일
     */
    @PostMapping("/api/sessions/stt")
    public ResponseEntity<?> saveStt(@RequestBody MemoDto dto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}