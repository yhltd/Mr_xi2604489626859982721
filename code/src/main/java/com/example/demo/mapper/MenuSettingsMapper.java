package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.MenuSettings;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/13 16:53
 */
@Mapper
public interface MenuSettingsMapper extends BaseMapper<MenuSettings> {
    @Select("select * from menu_settings where supplier like concat('%',#{query},'%') or brand like concat('%',#{query},'%') or sort like concat('%',#{query},'%') or shape like concat('%',#{query},'%') ")
    List<MenuSettings> queryList(String query);
}
