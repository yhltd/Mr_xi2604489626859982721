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

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id")
    List<Commodity> getList();
//    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,file.other_id as pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id left join file_table as file on a.id = file.other_id")
//    List<Commodity> getList();

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,file.other_id as pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id left join file_table as file on a.id = file.other_id where ${column_name1} like concat('%',#{condition1},'%') ")
    List<Commodity> queryList1(String column_name1,String condition1);

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,file.other_id as pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id left join file_table as file on a.id = file.other_id where ${column_name1} like concat('%',#{condition1},'%') and ${column_name2} like concat('%',#{condition2},'%') ")
    List<Commodity> queryList2(String column_name1,String condition1,String column_name2,String condition2);

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,file.other_id as pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id left join file_table as file on a.id = file.other_id where ${column_name1} like concat('%',#{condition1},'%') and ${column_name2} like concat('%',#{condition2},'%') and ${column_name3} like concat('%',#{condition3},'%')")
    List<Commodity> queryList3(String column_name1,String condition1,String column_name2,String condition2,String column_name3,String condition3);

    @Select("select * from commodity where id=#{id}")
    List<Commodity> getFile(int id);

    @Update("update commodity set pdf1 = #{query},pdf1_name = #{pdfname} where id = #{id} ")
    boolean up1(String query,int id,String pdfname);

    @Update("update commodity set pdf2 = #{query},pdf2_name = #{pdfname} where id = #{id} ")
    boolean up2(String query,int id,String pdfname);

    @Select("select id from commodity where raw_code = #{rawCode} and goods_name " +
            "=#{goodsName} and raw_submission_code = #{rawSubmissionCode} and production_place = #{productionPlace} " +
            "and brand_name = #{brandName} and abbreviation = #{abbreviation} and supplier_name = #{supplierName} limit 1 ")
    List<Commodity> getCoId(String rawCode, String goodsName, String rawSubmissionCode, String productionPlace, String brandName, String abbreviation, String supplierName);


    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%')")
    List<Commodity> getListChineseName1(String cn,String priceMax,String priceMin,String contentMax,String contentMin);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') ")
    List<Commodity> getListChineseName2(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') ")
    List<Commodity> getListChineseName3(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') ")
    List<Commodity> getListChineseName4(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') ")
    List<Commodity> getListChineseName5(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') and ${column5} like concat('%',#{condition5},'%') ")
    List<Commodity> getListChineseName6(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4,String column5,String condition5);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id where c.inci_pin like concat('%',#{cn},'%') and ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') and ${column5} like concat('%',#{condition5},'%')  and ${column6} like concat('%',#{condition6},'%') ")
    List<Commodity> getListChineseName7(String cn,String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4,String column5,String condition5,String column6,String condition6);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  ")
    List<Commodity> getListChineseNameNot1(String priceMax,String priceMin,String contentMax,String contentMin);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%')")
    List<Commodity> getListChineseNameNot2(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') ")
    List<Commodity> getListChineseNameNot3(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') ")
    List<Commodity> getListChineseNameNot4(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') ")
    List<Commodity> getListChineseNameNot5(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') and ${column5} like concat('%',#{condition5},'%') ")
    List<Commodity> getListChineseNameNot6(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4,String column5,String condition5);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') and ${column5} like concat('%',#{condition5},'%') and ${column6} like concat('%',#{condition6},'%') ")
    List<Commodity> getListChineseNameNot7(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4,String column5,String condition5,String column6,String condition6);

    @Select("select c.commodity_id,com.id,raw_code,goods_name,raw_submission_code,production_place,brand_name,add_amount,abbreviation,supplier_name,solubility,appearance,smell,substance_label,efficacy_label,raw_label,patent,performance,taboo,c.inci_pin,c.chengben_pin,file.other_id as pdf1 from (select a.commodity_id,a.inci_pin,b.chengben_pin from (select commodity_id,group_concat(ci.content,'%-',ii.chinese_name separator '<br>') as inci_pin from commodity_inci ci left join inci_information ii on ci.inci_id=ii.id where convert(content,float)>=#{contentMin} and convert(content,float)<=#{contentMax} group by commodity_id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price where convert(price,float)>=#{priceMin} and convert(price,float)<=#{priceMax} group by commodity_id) as b on a.commodity_id=b.commodity_id where b.commodity_id is not null) as c left join commodity as com on c.commodity_id=com.id left join file_table as file on com.id = file.other_id  where ${column1} like concat('%',#{condition1},'%') and ${column2} like concat('%',#{condition2},'%') and ${column3} like concat('%',#{condition3},'%') and ${column4} like concat('%',#{condition4},'%') and ${column5} like concat('%',#{condition5},'%') and ${column6} like concat('%',#{condition7},'%')  and ${column6} like concat('%',#{condition7},'%') ")
    List<Commodity> getListChineseNameNot8(String priceMax,String priceMin,String contentMax,String contentMin,String column1,String condition1,String column2,String condition2,String column3,String condition3,String column4,String condition4,String column5,String condition5,String column6,String condition6,String column7,String condition7);

    @Select("select * from commodity order by raw_code desc limit 0,1")
    List<Commodity>getBianMa();

    @Select("select a.id,a.raw_code,a.goods_name,a.raw_submission_code,a.production_place,a.brand_name,a.add_amount,a.abbreviation,a.supplier_name,a.solubility,a.appearance,a.smell,a.substance_label,a.efficacy_label,a.raw_label,a.patent,a.performance,a.taboo,file.other_id as pdf1,a.pdf1_name,a.pdf2,a.pdf2_name,a.inci_pin,b.chengben_pin,CONCAT(a.solubility,a.appearance,a.smell) as wuli_pin from (select * from commodity as com left join (select commodity_id,group_concat(inci.content,'%-',info.chinese_name separator '<br>') as inci_pin from commodity_inci  as inci  left join inci_information as info on info.id = inci.inci_id group by commodity_id) as inc on inc.commodity_id = com.id) as a left join (select commodity_id,group_concat(unit,'kg-',price,'元' separator '<br>') as chengben_pin from commodity_price group by commodity_id) as b on a.id = b.commodity_id left join file_table as file on a.id = file.other_id where id=#{id}")
    List<Commodity> getListById(int id);

}

