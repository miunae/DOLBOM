package com.c103.dolbom.drive;

import com.c103.dolbom.client.dto.ClientDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/drive")
public class DriveController {

    //시큐리티 설정 : 들어올때 상담자만 들어올 수 있고, 내담자의 아이디가 존재해야한다.
    //공통 사항, 상담자아이디(시큐리티 해결), client_id, path(해당 위치의 경로)
    //폴더 생성
    //파일 업로드

    //파일 삭제
    //폴더 삭제
    //파일 이동
    //파일 및 폴더 보여주기

    //파일 다운로드
    //임시 폴더 만들기

}
