package com.c103.dolbom.drive;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DriveService {
    //member-client 폴더생성
    boolean memberClientFolder(Long memberClientId); //해당 상담자내담자의 폴더가 없으면 생성하는 로직 추가
    boolean pathFolder(Long memberClientId,String path);
    Long pathFileSave(Long memberClientId, String path, MultipartFile file) throws IOException;

}
