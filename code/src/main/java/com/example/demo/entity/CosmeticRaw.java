package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


/**
 * @author huchao
 * @date 2022/05/16 10:30
 */

@Data
@TableName("cosmetic_raw")
public class CosmeticRaw {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 品牌编码
     */
    private String brandCode;
    /**
     * 产地
     */
    private String productionPlace;
    /**
     * 品牌名称
     */
    private String brandName;
    /**
     * 官网网址
     */
    private String website;
    /**
     * 目录画册1
     */
    private String pictureAlbum1;
    /**
     * 目录画册2
     */
    private String pictureAlbum2;
    /**
     * 目录画册1名称
     */
    private String pictureAlbum1Name;
    /**
     * 目录画册1名称
     */
    private String pictureAlbum2Name;

}