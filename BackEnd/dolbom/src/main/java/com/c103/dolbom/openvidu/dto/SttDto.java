package com.c103.dolbom.openvidu.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SttDto {

    private Long conferenceId;
    private String path;

}
