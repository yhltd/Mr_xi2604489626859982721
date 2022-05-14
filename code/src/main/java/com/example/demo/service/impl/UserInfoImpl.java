package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.UserInfo;
import com.example.demo.mapper.UserInfoMapper;
import com.example.demo.service.IUserInfoService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.StringUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author wanghui
 * @date 2022/05/13 14:31
 */
@Service
public class UserInfoImpl extends ServiceImpl<UserInfoMapper,UserInfo> implements IUserInfoService {

    @Override
    public Map<String, Object> login(String username, String password) {
        //条件构造器
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        //账号
        queryWrapper.eq("username",username);
        //密码
        queryWrapper.eq("password",password);
        //获取User
        UserInfo userInfo = this.getOne(queryWrapper);
        //如果不为空
        String data = StringUtils.EMPTY;
        if(StringUtils.isNotNull(userInfo)){
            //转JSON
            data = GsonUtil.toJson(userInfo);

//            List<UserPower> powerList = iUserPowerService.getList(userInfo.getId());
            Map<String,Object> map = new HashMap<>();
            map.put("token",data);
//            map.put("power",powerList);
            return map;
        }
        return null;
    }
}
