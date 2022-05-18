package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Supplier;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/16 13:05
 */
@Mapper
public interface SupplierMapper extends BaseMapper<Supplier> {
    @Select("select * from supplier where type=#{supplier}")
    List<Supplier> getList(String supplier);

    @Select("select * from supplier where type=#{supplier} and supplier_code like concat('%',#{query},'%') or " +
            "abbreviation like concat('%',#{query},'%') or supplier_name like concat('%',#{query},'%')")
    List<Supplier> queryList(String supplier, String query);

    @Select("update supplier set supplier_code=#{supplierCode},type=#{type},abbreviation=#{abbreviation}" +
            ",supplier_name=#{supplierName},url=#{url} where id=#{id}")
    void update(int id, String supplierCode, String type, String abbreviation,String supplierName, String url);

    @Select("insert into supplier (supplier_code,type,abbreviation,supplier_name,url,pdf1,pdf2) values(#{supplierCode}," +
            "#{type},#{abbreviation},#{supplierName},#{url},#{pdf1},#{pdf2}) ")
    void insert(String supplierCode, String type, String abbreviation,
                String supplierName, String url, String pdf1, String pdf2);

    @Select("update supplier set pdf1=#{pdf},pdf1_name=#{pdfName} where id=#{id}")
    void upfile1(int id, String pdf, String pdfName);

    @Select("update supplier set pdf2=#{pdf},pdf2_name=#{pdfName} where id=#{id}")
    void upfile2(int id, String pdf, String pdfName);

    @Select("select * from supplier where id=#{id}")
    List<Supplier> getFile1(int id);
}