## docker start

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.25.0

## mysql

create database IF NOT EXISTS `dolbom` collate utf8mb4_general_ci;
create user 'lcm'@'localhost' identified by '1234';
grant all privileges on dolbom.\* to 'lcm'@'localhost';
flush privileges;

desc member;

select _ from member;
select _ from member_client;

INSERT INTO member(birth, email, name, password, phone, role)
VALUES ("2019-01-01", "miunae123@gmail.com","이재훈", "1234", "01012345678","COUNSELOR");

INSERT INTO member(birth, email, name, password, phone, role)
VALUES ("2019-01-01", "dolbomcommon@naver.com","이재훈", "1234", "01012345678","CLIENT");

insert into member_client (client_id, member_id)
values ("2","1");

select _ from conference;
select _ from member_conference;
select \* from conference_history;

## redis

docker run -it --link myredis:redis --rm redis redis-cli -h redis -p 6379

## back server

Dolbom Application

## front server

npm install
pip install -r requirements.txt
