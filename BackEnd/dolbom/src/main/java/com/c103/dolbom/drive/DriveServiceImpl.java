package com.c103.dolbom.drive;

import com.c103.dolbom.Entity.Drive;
import com.c103.dolbom.Entity.MemberClient;
import com.c103.dolbom.client.MemberClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DriveServiceImpl implements DriveService{
    private final MemberClientRepository memberClientRepository;
    private final DriveRepository driveRepository;
    @Value("${file.dir}")
    String absolutePath;
    @Override
    public boolean memberClientFolder(Long memberClientId) {
        StringBuilder saveFolderBuilder = new StringBuilder();
        saveFolderBuilder.append(absolutePath).append(File.separator).append(memberClientId.toString());
        File folder = new File(saveFolderBuilder.toString());
        if(!folder.exists()){//존재x
            folder.mkdir();
            return false;
        }
        else{//이미 존재
            return true;
        }
    }

    @Override
    public boolean pathFolder(Long memberClientId, String path) {
        String savePath = extractPath(memberClientId, path);

        File folder = new File(savePath);

        if(!folder.exists()){//존재x
            folder.mkdir();
            return true;
        }
        else{//이미 존재
            return false;
        }
    }

    private String extractPath(Long memberClientId, String path) {
        String[] pathArr = path.split("/");
        StringBuilder saveFolderBuilder = new StringBuilder();
        saveFolderBuilder.append(absolutePath).append(File.separator).append(memberClientId.toString());

        for(int i=0; i<pathArr.length;i++){
            saveFolderBuilder.append(File.separator).append(pathArr[i]);
            System.out.println(pathArr[i]);
        }
        return saveFolderBuilder.toString();
    }

    @Override
    public Long pathFileSave(Long memberClientId, String path, MultipartFile file) throws IOException {
        String savePath = extractPath(memberClientId, path);
        System.out.println(savePath);
        File folder = new File(savePath);
        if (!folder.exists()){
            return -1L;
        }
        //원래 파일 이름
        String originName = file.getOriginalFilename();
        //파일의 저장이름으로 쓰일 uuid
        String uuid = UUID.randomUUID().toString();
        //확장자
        String extension = originName.substring(originName.lastIndexOf("."));
        String savedName = uuid+extension;

        MemberClient memberClient = memberClientRepository.findById(memberClientId).get();

        Drive drive = Drive.builder()
                .memberClient(memberClient)
                .originName(originName)
                .savedName(savedName)
                .path(savePath+File.separator+savedName)
                .build();

        file.transferTo(new File(savePath+File.separator+savedName));

        Drive result = driveRepository.save(drive);

        return result.getId();
    }


}
