package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/05/13 16:51
 */
@Data
@TableName("menu_settings")
public class MenuSettings {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 供应商
     */
    private String supplier;
    /**
     * 原料品牌
     */
    private String brand;
    /**
     * 物质分类
     */
    private String sort;
    /**
     * 物理形态
     */
    private String shape;
}
