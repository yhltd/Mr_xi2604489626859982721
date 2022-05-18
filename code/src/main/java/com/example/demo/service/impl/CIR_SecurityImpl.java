package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CIR_Security;
import com.example.demo.mapper.CIR_SecurityMapper;
import com.example.demo.service.CIR_SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 16:56
 */
@Service
public class CIR_SecurityImpl extends ServiceImpl<CIR_SecurityMapper, CIR_Security> implements CIR_SecurityService {

    @Autowired
    CIR_SecurityMapper cIR_SecurityMapper;

    @Override
    public List<CIR_Security> getList() {
        return this.list();
    }

    @Override
    public List<CIR_Security> queryList(String query) {
        return cIR_SecurityMapper.queryList(query);
    }

    @Override
    public List<CIR_Security> preciseQueryList(String query) {
        return cIR_SecurityMapper.preciseQueryList(query);
    }

    @Override
    public CIR_Security add(CIR_Security cIR_Security) {
        return this.save(cIR_Security) ? cIR_Security : null;
    }

    @Override
    public boolean update(CIR_Security cIR_Security) {
        return this.updateById(cIR_Security);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
