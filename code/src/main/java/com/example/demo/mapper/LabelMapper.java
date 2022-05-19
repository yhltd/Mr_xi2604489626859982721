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
}
