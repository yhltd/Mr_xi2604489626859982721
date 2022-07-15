package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Label;
import com.example.demo.mapper.LabelMapper;
import com.example.demo.service.ILabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 10:28
 */
@Service
public class LabelImpl extends ServiceImpl<LabelMapper, Label> implements ILabelService {

    @Autowired
    LabelMapper labelMapper;

    @Override
    public List<Label> getList(String type) {
        return labelMapper.getList(type);
    }

    @Override
    public List<Label> queryList(String type, String query) {
        return labelMapper.queryList(type, query);
    }

    @Override
    public Label add(Label label) {
        return this.save(label) ? label : null;
    }

    @Override
    public boolean update(Label label) {
        return updateById(label);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<Label> wuzhiList() {
        return labelMapper.wuzhiList();
    }

    @Override
    public void update_label(String new_label,String old_label){
        labelMapper.update_label(new_label,old_label);
    }
}
