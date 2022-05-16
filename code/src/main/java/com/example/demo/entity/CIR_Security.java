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
@TableName("cir_security")
public class CIR_Security {
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
     * CIR安全评估
     */
    private String safetyAssessment;

}