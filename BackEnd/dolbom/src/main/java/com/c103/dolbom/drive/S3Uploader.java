package com.c103.dolbom.drive;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷

    // S3 파일 업로드
    public String fileUpload(MultipartFile multipartFile, String path) throws IOException {
        // MultipartFile -> File
        File convertFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("file convert error")); // 파일을 변환할 수 없으면 에러

        // S3에 파일 업로드
        amazonS3Client.putObject(new PutObjectRequest(bucket, path, convertFile).withCannedAcl(CannedAccessControlList.PublicRead));
        String savedPath = amazonS3Client.getUrl(bucket, path).toString();
        // 로컬 파일 삭제
        convertFile.delete();

        return savedPath;
    }
    // S3 폴더 업로드
    public String folderUpload(String path) throws IOException {
        // S3에 폴더 업로드
        amazonS3Client.putObject(bucket, path + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
        String savedPath = amazonS3Client.getUrl(bucket, path).toString();
        return savedPath;
    }

    // S3 파일 삭제
    public void delete(String path) {
        amazonS3Client.deleteObject(bucket, path);
    }

    public List<String> getLevelFolderList(String prefix){
        List<String> fileNames = new ArrayList<>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        if(!prefix.equals("")){
            listObjectsRequest.setPrefix(prefix+"/");
        }
        listObjectsRequest.setDelimiter("/");

        ObjectListing s3Objects;
        String fileName;

        do{
            s3Objects = amazonS3Client.listObjects(listObjectsRequest);

            for(String commonPrefix : s3Objects.getCommonPrefixes()){
                if(!prefix.equals("")){
                    fileName = commonPrefix.split(prefix+"")[1];
                } else{
                    fileName = commonPrefix;
                }
                fileNames.add(fileName);
            }

            listObjectsRequest.setMarker(s3Objects.getNextMarker());
        }while (s3Objects.isTruncated());
        return fileNames;
    }

    public List<String> getLevelFileList(String prefix){
        List<String> fileNames = new ArrayList<>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        if(!prefix.equals("")){
            listObjectsRequest.setPrefix(prefix+"/");
        }
        listObjectsRequest.setDelimiter("/");

        ObjectListing s3Objects;
        String fileName;

        do{
            s3Objects = amazonS3Client.listObjects(listObjectsRequest);

            for (S3ObjectSummary objectSummary : s3Objects.getObjectSummaries()) { // prefix 경로의 파일명이 있다면 저장 (ex. one.wav)
                String key = objectSummary.getKey();
                String[] split = key.split(prefix + "/");
                if (split.length >= 2) {
                    fileNames.add(split[1]);
                }
            }
            listObjectsRequest.setMarker(s3Objects.getNextMarker());
        }while (s3Objects.isTruncated());
        return fileNames;
    }
    // 파일 convert 후 로컬에 업로드
    private Optional<File> convert(MultipartFile file) {
        File convertFile = new File(System.getProperty("user.home") + "/" + file.getOriginalFilename());
        try {
            file.transferTo(convertFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return Optional.of(convertFile);
    }

}
