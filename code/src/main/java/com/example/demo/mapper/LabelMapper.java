package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Label;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 10:21
 */
@Mapper
public interface LabelMapper extends BaseMapper<Label> {
    @Select("select * from label where type=#{type}")
    List<Label> getList(String type);

    @Select("select * from label as l right join (select sort from menu_settings where sort!='') as ms on ms.sort=l.type where label1 is not null")
    List<Label> getListByWuZhi();

    @Select("select * from label as l right join (select shape from menu_settings where shape!='') as ms on ms.shape=l.type where label1 in(#{label1})")
    List<Label> getListByWuLiwuli(String label1);

    @Select("select * from label as l right join (select shape from menu_settings where shape!='') as ms on ms.shape=l.type where label1 is not null")
    List<Label> getListByWuLi();

    @Select("select * from label where type=#{type} and (label1 like concat('%',#{query},'%') " +
            "or label2 like concat('%',#{query},'%') or label3 like concat('%',#{query},'%')) ")
    List<Label> queryList(String type,String query);

    @Select("select * from label where type='抗敏剂' or type='抗氧化剂' or type='美白剂' ")
    List<Label> wuzhiList();

    @Select("update supplier set type=#{new_label} where type=#{old_label}")
    void update_label(String new_label,String old_label);
}
