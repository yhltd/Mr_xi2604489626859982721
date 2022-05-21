package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author huchao
 * @date 2022/05/20 17:29
 */

@Data
@TableName("commodity_price")
public class Commodity_Price {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 原料商品信息id
     */
    private Integer commodityId;
    /**
     * 成本
     */
    private String price;
    /**
     * 规格
     */
    private String unit;

    /**
     * 以下字段数据表中没有，从commodity表中链接查询
     */

    /**
     * 原料编码
     */
    private String rawCode;
    /**
     * 商品名称
     */
    private String goodsName;
    /**
     * 原料报送码
     */
    private String rawSubmissionCode;
    /**
     * 产地
     */
    private String productionPlace;
    /**
     * 品牌名称
     */
    private String brandName;
    /**
     * 供应商简称
     */
    private String abbreviation;
    /**
     * 供应商公司名称
     */
    private String supplierName;



}
