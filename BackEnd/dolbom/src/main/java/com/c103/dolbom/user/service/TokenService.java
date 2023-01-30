package com.c103.dolbom.user.service;

import com.c103.dolbom.repository.MemberRepository;
import com.c103.dolbom.user.RefreshToken;
import com.c103.dolbom.user.repository.RefreshTokenRepository;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonValueFormat.UUID;

@Service
public class TokenService {

    private static final String SECRET_KEY = "abcdefgabcdefgabcdefgabcdefgabcdefgabcdefg";
    private static final int ACCESS_TOKEN_EXPIRES = 30000;

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final SecretKey secretKey;

    public TokenService(final MemberRepository memberRepository,
                        final RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public RefreshTokenResponse generateRefreshToken(final RefreshTokenRequest request) {
        Long memberId = memberRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElseThrow(AuthException::new)
                .getId();

        RefreshToken refreshToken = new RefreshToken(UUID.randomUUID().toString(), memberId);
        refreshTokenRepository.save(refreshToken);

        return new RefreshTokenResponse(refreshToken);
    }

    public AccessTokenResponse generateAccessToken(final AccessTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findById(request.getRefreshToken())
                .orElseThrow(InvalidRefreshTokenException::new);
        Long memberId = refreshToken.getMemberId();

        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_EXPIRES);

        String accessToken = Jwts.builder()
                .signWith(secretKey)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .setSubject(String.valueOf(memberId))
                .compact();

        return new AccessTokenResponse(accessToken);
    }

    public Long extractMemberId(final String accessToken) {
        try {
            String memberId = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody()
                    .getSubject();
            return Long.parseLong(memberId);
        } catch (final JwtException e) {
            throw new InvalidAccessTokenException();
        }
    }
}
