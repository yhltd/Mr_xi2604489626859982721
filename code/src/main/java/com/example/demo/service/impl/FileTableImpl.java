package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.FileTable;
import com.example.demo.mapper.FileTableMapper;
import com.example.demo.service.IFileTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/06/16 9:16
 */
@Service
public class FileTableImpl extends ServiceImpl<FileTableMapper, FileTable> implements IFileTableService {
    @Autowired FileTableMapper fileTableMapper;

    @Override
    public List<FileTable> getList(int otherId, String type) {
        return fileTableMapper.getList(otherId,type);
    }

    @Override
    public void insert(String fileName, String files, int otherId, String type) {
        fileTableMapper.insert(fileName,files,otherId,type);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<FileTable> getFile(int id) {
        return fileTableMapper.getFile(id);
    }
}
