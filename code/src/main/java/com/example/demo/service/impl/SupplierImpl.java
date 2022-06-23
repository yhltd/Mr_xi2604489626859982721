package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Supplier;
import com.example.demo.mapper.SupplierMapper;
import com.example.demo.service.ISupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/16 13:21
 */
@Service
public class SupplierImpl extends ServiceImpl<SupplierMapper, Supplier> implements ISupplierService {

    @Autowired SupplierMapper supplierMapper;

    @Override
    public List<Supplier> getList(String supplier) {
        return supplierMapper.getList(supplier);
    }

    @Override
    public List<Supplier> queryList(String supplier,String query) {
        return supplierMapper.queryList(supplier,query);
    }

    @Override
    public void add(String supplierCode, String type, String abbreviation, String supplierName,
                        String url, String pdf1, String pdf2) {
        supplierMapper.insert(supplierCode,type,abbreviation,supplierName,url,pdf1,pdf2);
    }

    @Override
    public void update(int id, String supplierCode, String type, String abbreviation, String supplierName, String url) {
        supplierMapper.update(id,supplierCode,type,abbreviation,supplierName,url);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public void upfile1(int id, String pdf,String pdfName) {
        supplierMapper.upfile1(id,pdf,pdfName);
    }

    @Override
    public void upfile2(int id, String pdf,String pdfName) {
        supplierMapper.upfile2(id,pdf,pdfName);
    }

    @Override
    public List<Supplier> getFile1(int id) {
        return supplierMapper.getFile1(id);
    }

    @Override
    public List<Supplier> getBianma() {
        return supplierMapper.getBianMa();
    }
}
