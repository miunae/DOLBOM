package com.c103.dolbom.drive;

import com.c103.dolbom.Entity.Drive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriveRepository extends JpaRepository<Drive, Long> {

    Drive findDriveByMemberClientId(Long memberClientId);

}
