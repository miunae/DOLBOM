package com.c103.dolbom.drive;

import com.c103.dolbom.drive.dto.FileResponseDto;
import com.c103.dolbom.drive.dto.FolderPathRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

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
    //파일 다운로드 미완
    @GetMapping("/{id}")
    public ResponseEntity<?> download(@PathVariable("id") Long fileId, HttpServletResponse response){
        try {
            byte[] fileByte = driveService.pahtFileDownload(fileId);response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode("tistory.png", StandardCharsets.UTF_8)+"\";");
            response.setHeader("Content-Transfer-Encoding", "binary");

            response.getOutputStream().write(fileByte);
            response.getOutputStream().flush();
            response.getOutputStream().close();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return new ResponseEntity<>("", HttpStatus.OK);
    }

    //파일 및 폴더 보여주기
    @GetMapping("/folder")
    public ResponseEntity<?> open(@RequestParam("id") Long memberClientId,@RequestParam("path") String path){
        List<FileResponseDto> fileList = driveService.openFolder(memberClientId, path);
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
        driveService.deleteFolder(memberClientId,path);
        return new ResponseEntity<>("folder delete success", HttpStatus.OK);
    }
    //상담사 내담자 폴더 만들기
    @GetMapping("/{id}")
    public ResponseEntity<?> testFolder(@PathVariable("id") Long memberClientId){
        if(driveService.memberClientFolder(memberClientId)){
            return new ResponseEntity<>("create folder", HttpStatus.OK);
        }
        else return new ResponseEntity<>("already exist folder.", HttpStatus.OK);

    }

}
