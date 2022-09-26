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

    @Select("select id from inci_information where serial_number = #{query}")
    List<INCI_Information> getInciId(String query);

    @Select("select * from inci_information where  chinese_name like concat('%',#{chineseName_a},'%') or english_name like concat('%',#{englishName_a},'%')")
    List<INCI_Information> getlistobscure(String chineseName_a,String englishName_a);

    @Select("select * from inci_information where chinese_name=#{chineseName_a} or english_name=#{englishName_a}")
    List<INCI_Information> getlistprecision(String chineseName_a,String englishName_a);

    @Select("select * from inci_information where chinese_name=#{chn_name} limit 1")
    List<INCI_Information>getListByChnName(String chn_name);


}
