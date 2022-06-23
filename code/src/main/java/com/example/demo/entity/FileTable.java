package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author wanghui
 * @date 2022/06/16 9:12
 */
@Data
@TableName("file_table")
public class FileTable {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 文件名
     */
    private String fileName;
    /**
     * 文件
     */
    private String files;
    /**
     * 其他表id
     */
    private Integer otherId;
    /**
     * 类型
     */
    private String type;
}
