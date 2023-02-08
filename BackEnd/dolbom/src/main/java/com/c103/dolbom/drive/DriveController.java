package com.c103.dolbom.drive;

import com.c103.dolbom.drive.dto.FileResponseDto;
import com.c103.dolbom.drive.dto.FolderPathRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class DriveController {
    private final DriveService driveService;
    //시큐리티 설정 : 들어올때 상담자만 들어올 수 있고, 내담자의 아이디가 존재해야한다.
    //폴더 생성
    @PostMapping("/folder")
    public ResponseEntity<?> pathFolder(@RequestBody FolderPathRequestDto dto){
        if(driveService.pathFolder(dto.getMemberClientId(), dto.getPath())){
            return new ResponseEntity<>("create folder", HttpStatus.OK);
        }
        return new ResponseEntity<>("already exist folder.", HttpStatus.BAD_REQUEST);
    }
    //파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<?> pathUploadFile(@RequestPart("file") MultipartFile file, @RequestPart("dto") FolderPathRequestDto dto) throws IOException {
        Long fileId = driveService.pathFileSave(dto.getMemberClientId(), dto.getPath(),file);
        return new ResponseEntity<>(fileId, HttpStatus.OK);
    }
    //파일 다운로드
    @GetMapping("/file/{id}")
    public ResponseEntity<?> download(@PathVariable("id") Long fileId){
        try {
            File file = driveService.pahtFileDownload(fileId);
            Resource resource = new InputStreamResource(Files.newInputStream(file.toPath()));
            HttpHeaders headers = new HttpHeaders();
            // 다운로드 되거나 로컬에 저장되는 용도로 쓰이는지를 알려주는 헤더
            headers.setContentDisposition((ContentDisposition.builder("attachment").filename(file.getName()).build()));
            return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
        }

    }

    //파일 및 폴더 보여주기
    @GetMapping("/folder")
    public ResponseEntity<?> getFolderList(@RequestParam("id") Long memberClientId,@RequestParam("path") String path){
        List<String> fileList = driveService.getFolderList(memberClientId, path);

        return new ResponseEntity<>(fileList, HttpStatus.OK);


    }
    @GetMapping("/file")
    public ResponseEntity<?> getFileList(@RequestParam("id") Long memberClientId,@RequestParam("path") String path){
        List<FileResponseDto> fileList = driveService.getFileList(memberClientId, path);

        return new ResponseEntity<>(fileList, HttpStatus.OK);


    }
    //파일을 폴더 안에 넣기 ->실제 파일 이동 후 db에서 path변경
    @PatchMapping("/file")
    public ResponseEntity<?> moveFile(@RequestParam("id") Long memberClientId,@RequestParam("path") String path,@RequestParam("file_id") Long fileId){
        try {
            driveService.moveFile(memberClientId,path,fileId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>("file move success", HttpStatus.OK);
    }
    //파일 삭제
    @DeleteMapping("/file")
    public ResponseEntity<?> deleteFile(@RequestParam("id") Long memberClientId,@RequestParam("path") String path,@RequestParam("file_id") Long fileId){
        driveService.deleteFile(memberClientId,path,fileId);
        return new ResponseEntity<>("file delete success", HttpStatus.OK);
    }

    //폴더 삭제 디렉토리 이하 리스트를 뽑은 후 UUID로 삭제,
    @DeleteMapping("/folder")
    public ResponseEntity<?> deleteFolder(@RequestParam("id") Long memberClientId,@RequestParam("path") String path){
        try {
            driveService.deleteFolder(memberClientId,path);
        } catch (IOException e) {
            new ResponseEntity<>("folder delete failure", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("folder delete success", HttpStatus.OK);
    }


}
