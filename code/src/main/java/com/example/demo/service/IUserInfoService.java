package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;
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

    /**
     * 查询
     */
    List<UserInfo> getList();

    /**
     * 查询
     */
    List<UserInfo> queryList(String username);

    /**
     * 添加
     */
    UserInfo add(UserInfo userInfo);

    /**
     * 修改
     */
    boolean update(UserInfo userInfo);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);
}
