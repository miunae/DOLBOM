package com.c103.dolbom.drive;

public interface DriveService {
    //member-client 폴더생성
    boolean memberClientFolder(Long memberClientId); //해당 상담자내담자의 폴더가 없으면 생성하는 로직 추가
}
