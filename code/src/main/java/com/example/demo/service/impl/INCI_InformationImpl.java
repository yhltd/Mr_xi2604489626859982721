package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.INCI_Information;
import com.example.demo.mapper.INCI_InformationMapper;
import com.example.demo.service.INCI_InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 16:56
 */
@Service
public class INCI_InformationImpl extends ServiceImpl<INCI_InformationMapper, INCI_Information> implements INCI_InformationService {

    @Autowired
    INCI_InformationMapper iNCI_InformationMapper;

    @Override
    public List<INCI_Information> getList() {
        return this.list();
    }

    @Override
    public List<INCI_Information> queryList(String query) {
        return iNCI_InformationMapper.queryList(query);
    }

    @Override
    public List<INCI_Information> preciseQueryList(String query) {
        return iNCI_InformationMapper.preciseQueryList(query);
    }

    @Override
    public INCI_Information add(INCI_Information iNCI_Information) {
        return this.save(iNCI_Information) ? iNCI_Information : null;
    }

    @Override
    public boolean update(INCI_Information iNCI_Information) {
        return this.updateById(iNCI_Information);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
