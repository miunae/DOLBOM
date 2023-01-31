package com.c103.dolbom.openvidu.service;

import com.c103.dolbom.openvidu.repository.ConferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConferenceServiceImpl implements ConferenceService{

    @Autowired
    ConferenceRepository conferenceRepository;



}
