package com.c103.dolbom.drive;

import com.c103.dolbom.drive.dto.FolderPathRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/drive")
@RequiredArgsConstructor
public class DriveController {
    private final DriveService driveService;
    //시큐리티 설정 : 들어올때 상담자만 들어올 수 있고, 내담자의 아이디가 존재해야한다.
    //공통 사항, 상담자아이디(시큐리티 해결), client_id, path(해당 위치의 경로)
    //폴더 생성
    @PostMapping("/folder")
    public ResponseEntity<?> pathFolder(@RequestBody FolderPathRequestDto dto){
        if(driveService.pathFolder(dto.getMemberClientId(), dto.getPath())){
            return new ResponseEntity<>("폴더생성", HttpStatus.OK);
        }
        return new ResponseEntity<>("이미 존재하는 폴더입니다.", HttpStatus.BAD_REQUEST);
    }
    //파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<?> pathUploadFile(@RequestPart("file") MultipartFile file, @RequestPart("dto") FolderPathRequestDto dto) throws IOException {
        Long fileId = driveService.pathFileSave(dto.getMemberClientId(), dto.getPath(),file);
        return new ResponseEntity<>(fileId, HttpStatus.OK);
    }
    //파일 다운로드
    //파일 및 폴더 보여주기
    //파일 이동
    //파일 삭제
    //폴더 삭제

    //임시 폴더 만들기
//    @GetMapping("/{id}")
//    public ResponseEntity<?> testFolder(@PathVariable("id") Long memberClientId){
//        driveService.memberClientFolder(memberClientId);
//        return new ResponseEntity<>("폴더생성", HttpStatus.OK);
//    }

}
