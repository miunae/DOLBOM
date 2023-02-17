
# DOLBOM

심리 상담사를 위한 온라인 상담 플랫폼
<br>
# 프로젝트 개요
- 진행기간 : 2022.01.02 ~ 2022.02.17
- 목표
    - WebRTC 기술을 사용해 비대면 화상 스터디 플랫폼 제작
    - 심리상담사를 위한 올인원 상담 플랫폼 목표
    - 일정 관리부터 상담 후 자료 관리까지 상담 프로세스 전반적인 업무 관리

- 와이어프레임
![와이어프레임.PNG](./와이어프레임.PNG)
- ERD
![dolbom_erd.png](./dolbom_erd.png)

<br>

# 프로젝트 소개
## 기획 배경
- 코로나로 인해 증가한 온라인 상담
- 심리상담사들 입장에서 편하게 사용할 수 있는 플랫폼의 필요성

# 주요 기능
## 스케줄링
> 스케줄을 편하게 관리
- 로그인
<br>
![로그인gif](/uploads/ebc378513afd92908a1125298849c666/로그인gif.gif)

<br><br><br><br>
- 내담자 신규생성
<br>
![내담자생성](/uploads/1db419bd0ea92e7e13006e6cbd13d24a/내담자생성.gif)

<br><br><br><br>
- 스케줄 신규 생성
<br>
![스케줄생성](/uploads/067a268553ccead7132c69da45e44f40/스케줄생성.gif)

<br><br><br><br>
- 스케줄 수정
<br>
![스케줄수정](/uploads/52147de1abcbe6f7cbe1bebf34fac022/스케줄수정.gif)

<br><br><br><br>
- 스케줄 조회(월,주,일) + 드래그앤드롭으로 수정 
<br>
![주_일_스케줄조회_드래그앤드롭](/uploads/07f80bcf97e9e5b521c798b3091b5ed6/주_일_스케줄조회_드래그앤드롭.gif)

<br><br><br><br>
- 스케줄 삭제
<br>
![스케줄삭제](/uploads/ea55d0dd510e9583392ac33a861847a2/스케줄삭제.gif)

<br><br><br><br>
## 파일 관리
> 내담자 별로 상담 자료 편리하게 저장 가능
- 폴더 생성 + 접속
<br>
![폴더저장+접속](/uploads/87803d0d8eb9810326ad3e4cb5201bac/폴더저장+접속.gif)

<br><br><br><br>
- 폴더 이동
<br>
![내담자폴더이동](/uploads/86bb4e028e5d32bbf445fdd0dc29baa8/내담자폴더이동.gif)

<br><br><br><br>
- 폴더 삭제
<br>
![폴더삭제](/uploads/8d0981824680d6b1d48f68060c3bc8de/폴더삭제.gif)

<br><br><br><br>
- 파일 서버에 저장
<br>
![파일저장](/uploads/222f206d7a6556f696e80126e73e1928/파일저장.gif)

<br><br><br><br>
- 서버에 저장된 파일 다운로드
<br>
![저장된파일다운로드](/uploads/a51bb35d1379f96557bb28b72d2fbb42/저장된파일다운로드.gif)

<br><br><br><br>
- 서버에 저장된 파일 삭제
<br>
![s3에저장된파일삭제](/uploads/f94564615aa413fd38f35dcf2982b513/s3에저장된파일삭제.gif)

<br><br><br><br>
## 내담자 관리
> 내담자를 한 곳에서 관리
## 온라인 상담
> 비대면 상담 진행

<br>

# 아키텍처
![image.png](./image.png)

<br>

# 개발환경
- OS: Windows10
- Backend Framework: Spring Boot 2.7.8
- Frontend Framework: React 17
- DB: MySQL Ver 8.0.32, Redis Ver 7.0.8
- WAS: Gradle
- JVM: OpenJDK version 11
- WebRTC: openVidu 2.25.0

<br>

# 배포환경
- exec 폴더 참조

<br>

# 팀원
- 이충무 : 팀장 Backend
- 이재훈 : Backend
- 박종수 : Backend
- 박현우 : Frontend
- 박승빈 : Frontend
