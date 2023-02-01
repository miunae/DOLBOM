package com.c103.dolbom.client;

import com.c103.dolbom.Entity.MemberClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberClientRepository extends JpaRepository<MemberClient,Long> {
    List<MemberClient> findByMemberId(Long memberId);
    List<MemberClient> findByClientId(Long clientId);
    void deleteByClientId(Long clientId);
    void deleteByClientIdAndMemberId(Long clientId,Long memberId);
}
