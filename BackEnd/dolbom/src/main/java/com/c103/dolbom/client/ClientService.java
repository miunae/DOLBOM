package com.c103.dolbom.client;


import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.dto.ClientJoinDto;
import com.c103.dolbom.client.dto.ClientModifiedDto;

import java.util.List;

public interface ClientService {
    List<Member> getMemberListByMemberId(Long memberId);
    Long joinClient(ClientJoinDto dto);
//    Long modifyClient()
    Long modifyClient(ClientModifiedDto dto);
    int deleteClient(Long clientId,Long memberId);
}
