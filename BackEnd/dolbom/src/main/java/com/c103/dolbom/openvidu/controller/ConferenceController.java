package com.c103.dolbom.openvidu.controller;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.ClientService;
import com.c103.dolbom.client.dto.ClientDto;
import com.c103.dolbom.openvidu.service.ConferenceService;
import io.openvidu.java.client.*;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
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
     * @param params The COUNSELOR's id
     * @param params The Session properties
     * @param id The CLIENT's id
     * @return The Session ID
     */
    @PostMapping("/api/sessions/{id}")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params
                                                    ,@PathVariable("id") Long id)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Long clientId = (Long)params.get("clientId");
        String sessionId = (String)params.get("customSessionId");
        ClientDto client = clientService.getClient(clientId);
        conferenceService.createConference(id,sessionId);
        //내담자 이메일 발송
        Email email = new SimpleEmail();
        email.setHostName("smtp.naver.com");
        email.setSmtpPort(587);
        email.setCharset("utf-8"); // 인코딩 설정(utf-8, euc-kr)
        email.setAuthenticator(new DefaultAuthenticator("miunae", "Wogns161541#"));
        email.setSSL(true);
        try{
            email.setFrom("miunae@naver.com", "이재훈");
            email.setSubject("DOLBOM 화상회의 초대 링크 전송");
            email.setMsg("회의 링크: "+"www.localhost:3000"+"\n"+"참여 코드: " +sessionId);
            email.addTo(client.getEmail(), client.getName()); // 보낼 사람
            email.send();
        }catch (EmailException e){
            e.printStackTrace();
        }

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * 방 참가
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        System.out.println("연결되었음");

        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        System.out.println("Token: "+ connection.getToken());
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}