package com.c103.dolbom.repository;

import com.c103.dolbom.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

import java.util.Optional;
import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

=======
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {


>>>>>>> origin/frontshelter2
    Optional<Member> findByEmailAndPassword(String email, String password);
    Optional<Member> findByEmail(String email);
    List<Member> findByName(String name);
    List<Member> findByIdIn(List<Long> clientIdList);
}
