package com.c103.dolbom.user.controller;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.user.auth.PrincipalDetails;
import com.c103.dolbom.user.dto.MemberDto;
import com.c103.dolbom.user.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/user/mypage")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {

        Member member = principalDetails.getMember();
        MemberDto ud = MemberDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .content(member.getContent())
                .birth(member.getBirth())
                .phone(member.getPhone())
                .build();

        return new ResponseEntity<MemberDto> (ud, HttpStatus.OK);
    }

//    @GetMapping("/idCheck/{id}")
//    public ResponseEntity<?> checkIdDuplicated(@PathVariable String id) {
//        Map<String, Boolean> map = new HashMap<>();
//        try {
//            map.put("isExist", userService.checkIdDuplicated(id));
//            return ResponseEntity.ok(map);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

    @PostMapping("/user")
    public ResponseEntity<?> create(@RequestBody Member member) {

        try {
            memberService.createMember(member);
            return ResponseEntity.ok("create OK");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @PutMapping("/user")
//    public ResponseEntity<?> update(@RequestBody Member user, @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        Member authUser = principalDetails.getMember();
//        try {
//            memberService.updateUser(user, authUser);
//            return ResponseEntity.ok("update OK");
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @DeleteMapping("/user")
//    public ResponseEntity<?> remove(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        Member authUser = principalDetails.getMember();
//        try {
//            memberService.deleteUser(authUser);
//            return new ResponseEntity<String>("delete OK", HttpStatus.OK);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
}
