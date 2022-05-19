package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/05/19 14:22
 */
@Data
@TableName("user_power")
public class UserPower {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 用户id
     */
    private Integer userId;
    /**
     * 页面
     */
    private String viewName;
    /**
     * 增
     */
    private String zeng;
    /**
     * 删
     */
    private String shan;
    /**
     * 改
     */
    private String gai;
    /**
     * 查
     */
    private String cha;
    /**
     * 用户名
     */
    private String username;
}
