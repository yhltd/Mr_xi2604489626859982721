package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserPower;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 14:24
 */
@Mapper
public interface UserPowerMapper extends BaseMapper<UserPower> {
    @Select("select up.id,user_id,username,view_name,zeng,shan,gai,cha from user_power up left join " +
            "user_info ui on ui.id=up.user_id ")
    List<UserPower>getList();

    @Select("select up.id,user_id,username,view_name,zeng,shan,gai,cha from user_power up left join " +
            "user_info ui on ui.id=up.user_id where username like concat('%',#{username},'%') ")
    List<UserPower>queryList(String username);

    @Select("select up.id,user_id,username,view_name,zeng,shan,gai,cha from user_power up left join " +
            "user_info ui on ui.id=up.user_id where ui.id=#{id}  ")
    List<UserPower>getListById(int id);
}
