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

    @Override
    public List<Commodity> getCoId(String rawCode, String goodsName, String rawSubmissionCode, String productionPlace, String brandName, String abbreviation, String supplierName) {
        return commodityMapper.getCoId( rawCode,  goodsName,  rawSubmissionCode,  productionPlace,  brandName,  abbreviation,  supplierName);
    }

    @Override
    public List<Commodity> getListChineseName1(String cn, String priceMax, String priceMin, String contentMax, String contentMin) {
        return commodityMapper.getListChineseName1(cn,priceMax,priceMin,contentMax,contentMin);
    }

    @Override
    public List<Commodity> getListChineseName2(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1) {
        return commodityMapper.getListChineseName2(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1);
    }

    @Override
    public List<Commodity> getListChineseName3(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2) {
        return commodityMapper.getListChineseName3(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1,column2,condition2);
    }

    @Override
    public List<Commodity> getListChineseName4(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3) {
        return commodityMapper.getListChineseName4(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1,column2,condition2,column3,condition3);
    }

    @Override
    public List<Commodity> getListChineseName5(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4) {
        return commodityMapper.getListChineseName5(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1,column2,condition2,column3,condition3,column4,condition4);
    }

    @Override
    public List<Commodity> getListChineseName6(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5) {
        return commodityMapper.getListChineseName6(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1,column2,condition2,column3,condition3,column4,condition4,column5,condition5);
    }

    @Override
    public List<Commodity> getListChineseName7(String cn, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5, String column6, String condition6) {
        return commodityMapper.getListChineseName7(cn,priceMax,priceMin,contentMax,contentMin,column1,condition1,column2,condition2,column3,condition3,column4,condition4,column5,condition5,column6,condition6);
    }

    @Override
    public List<Commodity> getListChineseNameNot1(String priceMax, String priceMin, String contentMax, String contentMin) {
        return commodityMapper.getListChineseNameNot1(priceMax,priceMin,contentMax,contentMin);
    }

    @Override
    public List<Commodity> getListChineseNameNot2(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1) {
        return commodityMapper.getListChineseNameNot2(priceMax,priceMin,contentMax,contentMin, column1, condition1);
    }

    @Override
    public List<Commodity> getListChineseNameNot3(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2) {
        return commodityMapper.getListChineseNameNot3(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2);
    }

    @Override
    public List<Commodity> getListChineseNameNot4(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3) {
        return commodityMapper.getListChineseNameNot4(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2, column3, condition3);
    }

    @Override
    public List<Commodity> getListChineseNameNot5(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4) {
        return commodityMapper.getListChineseNameNot5(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2, column3, condition3, column4, condition4);
    }

    @Override
    public List<Commodity> getListChineseNameNot6(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5) {
        return commodityMapper.getListChineseNameNot6(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2, column3, condition3, column4, condition4, column5, condition5);
    }

    @Override
    public List<Commodity> getListChineseNameNot7(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5, String column6, String condition6) {
        return commodityMapper.getListChineseNameNot7(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2, column3, condition3, column4, condition4, column5, condition5,column6,condition6);
    }

    @Override
    public List<Commodity> getListChineseNameNot8(String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5, String column6, String condition6, String column7, String condition7) {
        return commodityMapper.getListChineseNameNot8(priceMax,priceMin,contentMax,contentMin, column1, condition1, column2, condition2, column3, condition3, column4, condition4, column5, condition5,column6,condition6,column7,condition7);
    }

    @Override
    public List<Commodity> getBianma() {
        return commodityMapper.getBianMa();
    }
}