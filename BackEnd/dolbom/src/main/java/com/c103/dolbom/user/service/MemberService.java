package com.c103.dolbom.user.service;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void createMember(Member member) {
        member.setUserPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }
}
