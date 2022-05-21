package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Commodity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 13:34
 */
@Mapper
public interface CommodityMapper extends BaseMapper<Commodity> {

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,a.pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(info.serial_number,' ',info.chinese_name,' ',inci.content) as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id")
    List<Commodity> getList();

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,a.pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(info.serial_number,' ',info.chinese_name,' ',inci.content) as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id where ${column_name1} like concat('%',#{condition1},'%') ")
    List<Commodity> queryList1(String column_name1,String condition1);

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,a.pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(info.serial_number,' ',info.chinese_name,' ',inci.content) as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id where ${column_name1} like concat('%',#{condition1},'%') and ${column_name2} like concat('%',#{condition2},'%') ")
    List<Commodity> queryList2(String column_name1,String condition1,String column_name2,String condition2);

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,a.pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(info.serial_number,' ',info.chinese_name,' ',inci.content) as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id where ${column_name1} like concat('%',#{condition1},'%') and ${column_name2} like concat('%',#{condition2},'%') and ${column_name3} like concat('%',#{condition3},'%')")
    List<Commodity> queryList3(String column_name1,String condition1,String column_name2,String condition2,String column_name3,String condition3);

    @Select("select * from cosmetic_raw where id=#{id}")
    List<Commodity> getFile(int id);

    @Update("update commodity set pdf1 = #{query},pdf1_name = #{pdfname} where id = #{id} ")
    boolean up1(String query,int id,String pdfname);

    @Update("update commodity set pdf2 = #{query},pdf2_name = #{pdfname} where id = #{id} ")
    boolean up2(String query,int id,String pdfname);
}

