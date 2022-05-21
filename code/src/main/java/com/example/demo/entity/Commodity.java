package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author huchao
 * @date 2022/05/14 13:30
 */

@Data
@TableName("commodity")
public class Commodity {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
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
     * 建议添加量
     */
    private String addAmount;
    /**
     * 供应商简称
     */
    private String abbreviation;
    /**
     * 供应商公司名称
     */
    private String supplierName;
    /**
     * 溶解性
     */
    private String solubility;
    /**
     * 外观
     */
    private String appearance;
    /**
     * 气味
     */
    private String smell;
    /**
     * 物质标签
     */
    private String substanceLabel;
    /**
     * 功效标签
     */
    private String efficacyLabel;
    /**
     * 原料标签
     */
    private String rawLabel;
    /**
     * 专利信息
     */
    private String patent;
    /**
     * 产品性能
     */
    private String performance;
    /**
     * 配伍禁忌
     */
    private String taboo;
    /**
     * 原料画册1
     */
    private String pdf1;
    /**
     * 原料画册1名称
     */
    private String pdf1Name;
    /**
     * 原料画册2
     */
    private String pdf2;
    /**
     * 原料画册2名称
     */
    private String pdf2Name;

    /**
     * 以下字段数据表中没有，从commodity_inci和commodity_price表中链接查询获得
     */

    /**
     * inci中文名称及含量
     */
    private String inciPin;

    /**
     * 原料成本
     */
    private String chengbenPin;

    /**
     * 物理形态
     */
    private String wuliPin;


}