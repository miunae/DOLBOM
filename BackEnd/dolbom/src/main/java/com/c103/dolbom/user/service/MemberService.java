package com.c103.dolbom.user.service;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createMember(Member member) {
        member.setUserPassword(passwordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }
}
