package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Commodity_INCI;
import com.example.demo.entity.MenuSettings;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 13:34
 */
@Mapper
public interface Commodity_INCIMapper extends BaseMapper<Commodity_INCI> {

    @Select("select c.id,c.commodity_id,c.inci_id,i.serial_number,i.chinese_name,i.english_name,c.cas,c.content,purpose,rinsing_products,resident_products,risk_substance,raw_remarks,safety_risk,safety_assessment from commodity_inci c left join inci_information  i on c.inci_id=i.id left join cir_security as cir on cir.serial_number = i.serial_number")
    List<Commodity_INCI> getList();

    @Select("select c.id,c.commodity_id,c.inci_id,i.serial_number,i.chinese_name,i.english_name,c.cas,c.content,purpose,rinsing_products,resident_products,risk_substance,raw_remarks,safety_risk,safety_assessment from commodity_inci c left join inci_information  i on c.inci_id=i.id left join cir_security as cir on cir.serial_number = i.serial_number where i.serial_number like concat('%',#{query},'%') or c.cas like concat('%',#{query},'%') or c.content like concat('%',#{query},'%')")
    List<Commodity_INCI> queryList(String query);

    @Select("select c.id,c.commodity_id,c.inci_id,i.serial_number,i.chinese_name,i.english_name,c.cas,c.content,purpose,rinsing_products,resident_products,risk_substance,raw_remarks,safety_risk,safety_assessment from commodity_inci c left join inci_information  i on c.inci_id=i.id left join cir_security as cir on cir.serial_number = i.serial_number where commodity_id=#{id}")
    List<Commodity_INCI> getListById(int id);
}