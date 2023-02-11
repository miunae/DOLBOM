package com.c103.dolbom.schedule.repository;

import com.c103.dolbom.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query(value = "SELECT * FROM SCHEDULE WHERE TIMESTAMPDIFF(HOUR, :standardTime, start_time) BETWEEN 0 and :hour",nativeQuery = true)
    List<Schedule> getScheduleByTime(@Param("standardTime") String standardTime, @Param("hour") int hour);

}
