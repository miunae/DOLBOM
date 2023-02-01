package com.c103.dolbom.repository;

import com.c103.dolbom.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,Long> {
    List<Member> findByName(String name);

}
