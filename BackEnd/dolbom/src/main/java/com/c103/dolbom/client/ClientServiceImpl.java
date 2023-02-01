package com.c103.dolbom.client;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.Entity.MemberClient;
import com.c103.dolbom.Entity.Role;
import com.c103.dolbom.client.dto.ClientJoinDto;
import com.c103.dolbom.client.dto.ClientModifiedDto;
import com.c103.dolbom.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService{
    private final MemberClientRepository memberClientRepository;
    private final MemberRepository memberRepository;
    @Override
    public List<Member> getClientListByMemberId(Long memberId) {
        List<MemberClient> list = memberClientRepository.findByMemberId(memberId);

        List<Member> clientList = new ArrayList<>();

        for(MemberClient mc : list){
            clientList.add(mc.getClient());
        }
        return clientList;
    }

    @Override
    public List<Member> getClientListByName(String name) {
        List<Member> clientList = memberRepository.findByName(name);
        return clientList;
    }

    @Override
    public Long joinClient(ClientJoinDto dto) {
        //같은 이메일이 존재하다면 예외 발생

        Member entityMember = Member.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .role(Role.CLIENT)
                .phone(dto.getPhone())
                .password(randomString())
                .birth(dto.getBirth())
                .build();

        Member client = memberRepository.save(entityMember);
        Member member = memberRepository.findById(dto.getId()).get();

        MemberClient memberClient = MemberClient.builder()
                .member(member)
                .client(client)
                .build();

        Long memberClientId = memberClientRepository.save(memberClient).getId();
        return memberClientId;
    }

    @Override
    public Long joinRegisteredClient(Long client_id, Long member_id) {
        System.out.println("client_id = " + client_id + ", member_id = " + member_id);
        Member client = memberRepository.findById(client_id).get();
        Member member = memberRepository.findById(member_id).get();

        MemberClient memberClient = MemberClient.builder()
                .member(member)
                .client(client)
                .build();

        Long memberClientId = memberClientRepository.save(memberClient).getId();

        return memberClientId;
    }

    @Override
    public Long modifyClient(ClientModifiedDto dto) {
        Member client = memberRepository.findById(dto.getId()).get();

        client.changName(dto.getName());
        client.changeBirth(dto.getBirth());
        client.changeContent(dto.getContent());
        client.changePhone(dto.getPhone());

        Long clientId = memberRepository.save(client).getId();

        return clientId;
    }

    @Override
    @Transactional
    public int deleteClient(Long clientId,Long memberId) {
        memberClientRepository.deleteByClientIdAndMemberId(clientId, memberId);
        return 1;
    }

    private String randomString(){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 45;
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }


}
