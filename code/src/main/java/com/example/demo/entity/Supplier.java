package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/05/16 12:59
 */
@Data
@TableName("supplier")
public class Supplier {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 供应商编码
     */
    private String supplierCode;
    /**
     * 供应商分类
     */
    private String type;
    /**
     * 供应商简称
     */
    private String abbreviation;
    /**
     * 供应商名称
     */
    private String supplierName;
    /**
     * 公司官网
     */
    private String url;
    /**
     * pdf1
     */
    private String pdf1;
    /**
     * pdf2
     */
    private String pdf2;
    /**
     * 品牌
     */
    private String brand;
    /**
     * 文件名1
     */
    private String pdf1Name;
    /**
     * 文件名2
     */
    private String pdf2Name;
    /**
     * 公司
     */
    private String company;

}
