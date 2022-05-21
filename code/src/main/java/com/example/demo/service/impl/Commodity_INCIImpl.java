package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Commodity_INCI;
import com.example.demo.entity.MenuSettings;
import com.example.demo.mapper.Commodity_INCIMapper;
import com.example.demo.service.ICommodity_INCIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public class Commodity_INCIImpl extends ServiceImpl<Commodity_INCIMapper, Commodity_INCI> implements ICommodity_INCIService {

    @Autowired
    Commodity_INCIMapper commodity_INCIMapper;

    @Override
    public List<Commodity_INCI> getList() {
        return commodity_INCIMapper.getList();
    }

    @Override
    public Commodity_INCI add(Commodity_INCI commodity_INCI) {
        return this.save(commodity_INCI) ? commodity_INCI : null;
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean update(Commodity_INCI commodity_INCI) {
        return this.updateById(commodity_INCI);
    }

    @Override
    public List<Commodity_INCI> queryList(String query) {
        return commodity_INCIMapper.queryList(query);
    }

}
