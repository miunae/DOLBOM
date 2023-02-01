package com.c103.dolbom.client;


import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.dto.ClientJoinDto;
import com.c103.dolbom.client.dto.ClientModifiedDto;

import java.util.List;

public interface ClientService {
    List<Member> getClientListByMemberId(Long memberId);
    List<Member> getClientListByName(String name);
    Long joinClient(ClientJoinDto dto);
    Long joinRegisteredClient(Long client_id, Long member_id);

    Long modifyClient(ClientModifiedDto dto);
    int deleteClient(Long clientId,Long memberId);
}
