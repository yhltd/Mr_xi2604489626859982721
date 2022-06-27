package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.CosmeticRaw;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;


/**
 * @author huchao
 * @date 2022/05/14 13:34
 */
@Mapper
public interface CosmeticRawMapper extends BaseMapper<CosmeticRaw> {
    @Select("select * from cosmetic_raw where production_place=#{production_place}")
    List<CosmeticRaw> queryList(String production_place);

    @Select("select * from cosmetic_raw")
    List<CosmeticRaw> getList2();

    @Select("select * from cosmetic_raw where production_place = #{query} ")
    List<CosmeticRaw> preciseQueryList(String query);

    @Update("update cosmetic_raw set picture_album1 = #{query},picture_album1_name = #{pdfname} where id = #{id} ")
    boolean up1(String query,int id,String pdfname);

    @Update("update cosmetic_raw set picture_album2 = #{query},picture_album2_name = #{pdfname} where id = #{id} ")
    boolean up2(String query,int id,String pdfname);

    @Select("select * from cosmetic_raw where id=#{id}")
    List<CosmeticRaw> getFile1(int id);

    @Select("select * from cosmetic_raw order by brand_code desc limit 0,1")
    List<CosmeticRaw>getBianMa();
}
