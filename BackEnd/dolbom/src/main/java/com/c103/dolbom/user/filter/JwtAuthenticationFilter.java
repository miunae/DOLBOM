package com.c103.dolbom.user.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.repository.MemberRepository;
import com.c103.dolbom.user.auth.PrincipalDetails;
import com.c103.dolbom.user.common.JwtProperties;
import com.c103.dolbom.user.dto.RefreshToken;
import com.c103.dolbom.user.repository.RefreshTokenRepository;
import com.c103.dolbom.user.service.MemberService;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
//    private final MemberService memberService;
//    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("JwtAuthenticationFilter : 로그인 시도중");

        // request에 있는 username과 password를 파싱해서 자바 Object로 받기
        ObjectMapper om = new ObjectMapper();
        Member member = null;

        try {
            member = om.readValue(request.getInputStream(), Member.class);
            log.debug(member.toString());
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(member.getEmail(), member.getPassword());

            // authenticationManager.authenticate()에서 로그인 체크 확정임
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
            log.info("로그인 완료 됨 : " + principalDetails.getMember().getEmail()); // 로그인 정상적으로 되었다는 뜻

            return authentication;
        } catch (StreamReadException e) {
            e.printStackTrace();
        } catch (DatabindException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
            throw new AuthenticationServiceException("Request Content-Type (application/json) Parsing error");
        }

        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response
            , FilterChain chain, Authentication authResult) throws IOException, ServletException {

        log.info("successfulAuthentication 실행됨:인증이 완료되었다는 뜻임");
        PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();

        // RSA 방식 아니고 Hash 암호방식
        String accessToken = JWT.create()
                .withSubject(principalDetails.getMember().getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.ACCESS_EXP_TIME))
                .withClaim("email", principalDetails.getMember().getEmail()) // 비공개 claim
                .withClaim("name", principalDetails.getMember().getName())
//                .withClaim("role", principalDetails.getMember().getRole().toString())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET_KEY));

        response.setHeader(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_HEADER_PREFIX+accessToken);

//        String refreshToken = JWT.create()
//                .withSubject(principalDetails.getMember().getEmail())
//                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.REFRESH_EXP_TIME))
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET_KEY));
        Long memberId = principalDetails.getMember().getId();
        String key = UUID.randomUUID().toString();
        RefreshToken refreshToken = new RefreshToken(key, memberId);
        refreshTokenRepository.save(refreshToken);

//        userService.saveRefreshToken(principalDetails.getUser().getUserId(), refreshToken);
        System.out.println(JwtProperties.TOKEN_HEADER_PREFIX+key);
        System.out.println(key);
        response.setHeader(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_HEADER_PREFIX+key);

        // 응답 body에 기록
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put(JwtProperties.ACCESS_HEADER_STRING, accessToken);
        responseMap.put(JwtProperties.REFRESH_HEADER_STRING, key);
        new ObjectMapper().writeValue(response.getWriter(), responseMap);
    }
}
