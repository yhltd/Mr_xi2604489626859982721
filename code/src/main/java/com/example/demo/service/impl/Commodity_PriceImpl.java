package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Commodity_Price;
import com.example.demo.mapper.Commodity_PriceMapper;
import com.example.demo.service.ICommodity_PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public class Commodity_PriceImpl extends ServiceImpl<Commodity_PriceMapper, Commodity_Price> implements ICommodity_PriceService {

    @Autowired
    Commodity_PriceMapper commodity_PriceMapper;

    @Override
    public List<Commodity_Price> getList() {
        return commodity_PriceMapper.getList();
    }

    @Override
    public Commodity_Price add(Commodity_Price commodity_Price) {
        return this.save(commodity_Price) ? commodity_Price : null;
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean update(Commodity_Price commodity_INCI) {
        return this.updateById(commodity_INCI);
    }

    @Override
    public List<Commodity_Price> queryList(String query) {
        return commodity_PriceMapper.queryList(query);
    }

    @Override
    public List<Commodity_Price> getListById(int id) {
        return commodity_PriceMapper.getListById(id);
    }

}
