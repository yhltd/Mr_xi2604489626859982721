package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/13 14:27
 */
@Mapper
public interface UserInfoMapper extends BaseMapper<UserInfo> {
    @Select("select * from user_info where username like concat('%',#{username},'%') ")
    List<UserInfo>queryList(String username);
}
