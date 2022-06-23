package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.FileTable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/06/16 9:15
 */
@Service
public interface IFileTableService extends IService<FileTable> {
    /**
     * 查询
     * */
    List<FileTable>getList(int otherId,String type);

    /**
     * 添加
     * */
    void insert(String fileName, String files, int otherId,String type);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 下载
     * */
    List<FileTable>getFile(int id);
}
