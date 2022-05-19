package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/05/19 10:16
 */
@Data
@TableName("label")
public class Label {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 用户名
     */
    private String type;
    /**
     * 标签1
     */
    private String label1;
    /**
     * 标签2
     */
    private String label2;
    /**
     * 标签3
     */
    private String label3;
}
