package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author wanghui
 * @date 2022/05/13 14:27
 */
@Mapper
public interface UserInfoMapper extends BaseMapper<UserInfo> {
}
