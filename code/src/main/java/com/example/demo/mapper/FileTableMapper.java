package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.FileTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/06/16 9:14
 */
@Mapper
public interface FileTableMapper extends BaseMapper<FileTable> {
    @Select("select id,file_name,other_id from file_table where other_id=#{otherId} and type=#{type}")
    List <FileTable> getList(int otherId,String type);

    @Select("insert into file_table (file_name,files,other_id,type) values (#{fileName},#{files},#{otherId} " +
            ",#{type})")
    void insert(String fileName, String files, int otherId,String type);

    @Select("select * from file_table where id=#{id}")
    List <FileTable> getFile(int id);
}
