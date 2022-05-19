package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.UserPower;
import com.example.demo.mapper.UserPowerMapper;
import com.example.demo.service.IUserPowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 14:34
 */
@Service
public class UserPowerImpl extends ServiceImpl<UserPowerMapper, UserPower> implements IUserPowerService {

    @Autowired
    UserPowerMapper userPowerMapper;

    @Override
    public List<UserPower> getList() {
        return userPowerMapper.getList();
    }

    @Override
    public List<UserPower> getListById(int id) {
        return userPowerMapper.getListById(id);
    }

    @Override
    public List<UserPower> queryList(String username) {
        return userPowerMapper.queryList(username);
    }

    @Override
    public UserPower add(UserPower userPower) {
        return save(userPower) ? userPower : null;
    }

    @Override
    public boolean update(UserPower userPower) {
        return updateById(userPower);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
