package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


/**
 * @author huchao
 * @date 2022/05/20 17:14
 */

@Data
@TableName("commodity_inci")
public class Commodity_INCI {
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
     * cas
     */
    private String cas;
    /**
     * 成分含量
     */
    private String content;
    /**
     * inci数据查询id
     */
    private Integer inciId;

    /**
     * 以下字段数据表中没有，从inci_information表中链接查询
     */

    /**
     * 序号
     */
    private String serialNumber;
    /**
     * INCI名称/中文名称
     */
    private String chineseName;
    /**
     * INCI名称/英文名称
     */
    private String englishName;
    /**
     * 主要使用目的
     */
    private String purpose;
    /**
     * 淋洗类产品最高历史使用量（%）
     */
    private String rinsingProducts;
    /**
     * 驻留类产品最高历史使用量（%）
     */
    private String resident_products;
    /**
     * 是否可能存在安全性风险物质
     */
    private String riskSubstance;
    /**
     * 原料目录备注
     */
    private String rawRemarks;
    /**
     * 安全风险
     */
    private String safetyRisk;

    /**
     * 以下字段数据表中没有，从cir_security表中链接查询
     */

    /**
     * CIR安全评估
     */
    private String safetyAssessment;



}