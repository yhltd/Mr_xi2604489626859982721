package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.UserPower;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 14:31
 */
@Service
public interface IUserPowerService extends IService<UserPower> {
    /**
     * 查询
     */
    List<UserPower> getList();

    /**
     * 查询
     */
    List<UserPower> getListById(int id);

    /**
     * 查询
     */
    List<UserPower> queryList(String username);

    /**
     * 添加
     */
    UserPower add(UserPower userPower);

    /**
     * 修改
     */
    boolean update(UserPower userPower);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);


}
