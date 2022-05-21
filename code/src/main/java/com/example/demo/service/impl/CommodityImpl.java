package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Commodity;
import com.example.demo.entity.CosmeticRaw;
import com.example.demo.mapper.CommodityMapper;
import com.example.demo.service.ICommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public class CommodityImpl extends ServiceImpl<CommodityMapper, Commodity> implements ICommodityService {

    @Autowired
    CommodityMapper commodityMapper;

    @Override
    public List<Commodity> getList() {
        return commodityMapper.getList();
    }

    @Override
    public List<Commodity> queryList1(String column_name1,String condition1) {
        return commodityMapper.queryList1(column_name1,condition1);
    }

    @Override
    public List<Commodity> queryList2(String column_name1,String condition1,String column_name2,String condition2) {
        return commodityMapper.queryList2(column_name1,condition1,column_name2,condition2);
    }

    @Override
    public List<Commodity> queryList3(String column_name1,String condition1,String column_name2,String condition2,String column_name3,String condition3) {
        return commodityMapper.queryList3(column_name1,condition1,column_name2,condition2,column_name3,condition3);
    }

    @Override
    public Commodity add(Commodity commodity) {
        return this.save(commodity) ? commodity : null;
    }

    @Override
    public boolean update(Commodity commodity) {
        return this.updateById(commodity);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<Commodity> getFile(int id) {
        return commodityMapper.getFile(id);
    }

    @Override
    public boolean up1(String query,int id,String pdfname) {
        return commodityMapper.up1(query,id,pdfname);
    }

    @Override
    public boolean up2(String query,int id,String pdfname) {
        return commodityMapper.up2(query,id,pdfname);
    }
}