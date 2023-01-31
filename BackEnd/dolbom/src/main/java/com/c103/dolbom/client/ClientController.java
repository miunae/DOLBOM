package com.c103.dolbom.client;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.client.dto.ClientJoinDto;
import com.c103.dolbom.client.dto.ClientModifiedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
public class ClientController { //프로필 이미지 미완, 권한 ADMIN,COUNSELOR
    private final ClientService clientService;
    //내담자 전체 정보 불러오기
    @GetMapping("/{id}")
    public ResponseEntity<?> getClientListByMember(@PathVariable("id") Long memberId){
        List<Member> memberList = clientService.getMemberListByMemberId(memberId);
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }
    //내담자 상세정보는 memberController에서 대신 상담사 정보와는 다르게 일부정보만 가져오도록
    //내담자 등록
    @PostMapping
    public ResponseEntity<?> clientJoin(@RequestBody ClientJoinDto dto){
        Long memberClientId = clientService.joinClient(dto);
        return new ResponseEntity<>(memberClientId, HttpStatus.OK);
    }
    //내담자 수정
    @PutMapping
    public ResponseEntity<?> clientModify(@RequestBody ClientModifiedDto dto){
        Long clientId = clientService.modifyClient(dto);
        return new ResponseEntity<>(clientId, HttpStatus.OK);
    }

    //내담자 삭제
    @DeleteMapping("/{client_id}/{counselor_id}")
    public ResponseEntity<?> clientDelete(@PathVariable("client_id") Long clientId,@PathVariable("counselor_id") Long counselorId){
        int msg = clientService.deleteClient(clientId,counselorId);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

}
