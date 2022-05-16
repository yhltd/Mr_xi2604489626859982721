package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author huchao
 * @date 2022/05/14 09:54
 */

@Data
@TableName("inci_information")
public class INCI_Information {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
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
     * 淋洗类产品最高历史使用量（%）
     */
    private String rinsingProducts;
    /**
     * 驻留类产品最高历史使用量（%）
     */
    private String residentProducts;
    /**
     * 原料目录备注
     */
    private String rawRemarks;
    /**
     * 主要使用目的
     */
    private String purpose;
    /**
     * 是否可能存在安全性风险物质
     */
    private String riskSubstance;
    /**
     * 安全风险
     */
    private String safetyRisk;
}
