package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.CIR_Security;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 13:34
 */
@Mapper
public interface CIR_SecurityMapper extends BaseMapper<CIR_Security> {
    @Select("select * from cir_security where serial_number like concat('%',#{query},'%') or chinese_name like concat('%',#{query},'%') or english_name like concat('%',#{query},'%') ")
    List<CIR_Security> queryList(String query);

    @Select("select * from cir_security where serial_number = #{query} or chinese_name = #{query} or english_name = #{query} ")
    List<CIR_Security> preciseQueryList(String query);
}
