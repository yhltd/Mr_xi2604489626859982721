package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.INCI_Information;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 10:30
 */
@Mapper
public interface INCI_InformationMapper extends BaseMapper<INCI_Information> {
    @Select("select * from inci_information where serial_number like concat('%',#{query},'%') or chinese_name like concat('%',#{query},'%') or english_name like concat('%',#{query},'%') ")
    List<INCI_Information> queryList(String query);

    @Select("select * from inci_information where serial_number = #{query} or chinese_name = #{query} or english_name = #{query} ")
    List<INCI_Information> preciseQueryList(String query);
}
