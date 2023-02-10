package com.c103.dolbom.schedule.repository;

import com.c103.dolbom.Entity.Member;
import com.c103.dolbom.Entity.Schedule;
import com.c103.dolbom.schedule.dto.GetSchedule;
import com.c103.dolbom.schedule.dto.ScheduleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query(value = "SELECT * FROM SCHEDULE WHERE TIMESTAMPDIFF(HOUR, :standardTime, start_time) BETWEEN 0 and :hour",nativeQuery = true)
    List<Schedule> getScheduleByTime(@Param("standardTime") String standardTime, @Param("hour") int hour);

    @Query(value="select s.id as schedule_id, mc.client_id, mc.member_id as counselor_id, s.start_time, s.end_time, s.content from schedule s join member_client mc on (s.member_client_id = mc.id) \n" +
            "where member_id = :memberId and (start_time between :start and :end) and (end_time between :start and :end)", nativeQuery = true)
    List<GetSchedule> getScheduleListByPeriod(@Param("memberId") Long memberId, String start, String end);
}
