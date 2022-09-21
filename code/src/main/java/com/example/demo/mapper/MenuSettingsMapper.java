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



    @Select("")
    List<MenuSettings> queryListlabel(String add_type);

    @Select("update menu_settings set supplier=#{new_gongyingshang},brand=#{new_yuanliaopinpai},sort=#{new_wuzhifenlei},shape=#{new_wulixingtai} where id=#{id}")
    void update_id(int id, String new_gongyingshang, String new_yuanliaopinpai, String new_wuzhifenlei, String new_wulixingtai);
}
