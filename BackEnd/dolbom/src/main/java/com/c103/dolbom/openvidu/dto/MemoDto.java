package com.c103.dolbom.openvidu.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemoDto {

    private Long conferenceId;
    private String memo;

}
