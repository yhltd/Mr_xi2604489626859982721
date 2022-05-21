package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CosmeticRaw;
import com.example.demo.mapper.CosmeticRawMapper;
import com.example.demo.service.CosmeticRawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/16 10:45
 */
@Service
public class CosmeticRawImpl extends ServiceImpl<CosmeticRawMapper, CosmeticRaw> implements CosmeticRawService {

    @Autowired
    CosmeticRawMapper cosmeticRawMapper;

    @Override
    public List<CosmeticRaw> getList(String production_place) {
        return cosmeticRawMapper.preciseQueryList(production_place);
    }

    @Override
    public List<CosmeticRaw> getList2() {
        return cosmeticRawMapper.getList2();
    }

    @Override
    public List<CosmeticRaw> queryList(String query) {
        return cosmeticRawMapper.queryList(query);
    }

    @Override
    public List<CosmeticRaw> preciseQueryList(String query) {
        return cosmeticRawMapper.preciseQueryList(query);
    }

    @Override
    public CosmeticRaw add(CosmeticRaw cosmeticRaw) {
        return this.save(cosmeticRaw) ? cosmeticRaw : null;
    }

    @Override
    public boolean update(CosmeticRaw cosmeticRaw) {
        return this.updateById(cosmeticRaw);
    }

    @Override
    public boolean up1(String query,int id,String pdfname) {
        return cosmeticRawMapper.up1(query,id,pdfname);
    }

    @Override
    public boolean up2(String query,int id,String pdfname) {
        return cosmeticRawMapper.up2(query,id,pdfname);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<CosmeticRaw> getFile1(int id) {
        return cosmeticRawMapper.getFile1(id);
    }
}
