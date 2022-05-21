package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Commodity_Price;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 13:34
 */
@Mapper
public interface Commodity_PriceMapper extends BaseMapper<Commodity_Price> {

    @Select("select price.id,price.commodity_id,c.raw_code,c.goods_name,c.raw_submission_code,c.production_place,c.brand_name,c.abbreviation,c.supplier_name,price.unit,price.price from commodity_price as price left join commodity as c on price.commodity_id = c.id")
    List<Commodity_Price> getList();

    @Select("select price.id,price.commodity_id,c.raw_code,c.goods_name,c.raw_submission_code,c.production_place,c.brand_name,c.abbreviation,c.supplier_name,price.unit,price.price from commodity_price as price left join commodity as c on price.commodity_id = c.id where c.raw_code like concat('%',#{query},'%') or c.goods_name like concat('%',#{query},'%') or c.abbreviation like concat('%',#{query},'%') or c.brand_name like concat('%',#{query},'%')")
    List<Commodity_Price> queryList(String query);

    @Select("select * from commodity_price where commodity_id=#{id}")
    List<Commodity_Price> getListById(int id);
}
