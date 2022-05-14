package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author wanghui
 * @date 2022/05/13 14:30
 */
@Service
public interface IUserInfoService extends IService<UserInfo> {
    /**
     * 登陆
     *
     * @param username 用户名
     * @param password  密码
     * @return 转Json后的用户信息
     */
    Map<String,Object> login(String username, String password);
}
