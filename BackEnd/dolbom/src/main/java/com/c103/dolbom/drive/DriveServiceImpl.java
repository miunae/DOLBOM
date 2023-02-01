package com.c103.dolbom.drive;

import com.c103.dolbom.client.MemberClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class DriveServiceImpl implements DriveService{
    private final MemberClientRepository memberClientRepository;
    private final DriveRepository driveRepository;
    @Value("${file.dir}")
    String absolutePath;
    @Override
    public boolean memberClientFolder(Long memberClientId) {
        String saveFolder = absolutePath + File.separator + memberClientId.toString();
        File folder = new File(saveFolder);
        if(!folder.exists()){//존재x
            folder.mkdir();
            return false;
        }
        else{//이미 존재
            return true;
        }
    }



}
