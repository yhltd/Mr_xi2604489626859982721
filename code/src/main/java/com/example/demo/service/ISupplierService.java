package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Supplier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/16 13:16
 */
@Service
public interface ISupplierService extends IService<Supplier> {

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Supplier> getList(String supplier);


    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Supplier> queryList(String supplier,String query);

    /**
     * 添加
     *
     * @return 是否添加成功
     */
    void add(String supplierCode, String type, String abbreviation, String supplierName,
             String url, String pdf1, String pdf2,String company);

    /**
     * 修改
     */
    void update(int id, String supplierCode, String type, String abbreviation, String supplierName,
                String url,String company);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 上传文件1
     */
    void upfile1(int id , String pdf,String pdfName);

    /**
     * 上传文件2
     */
    void upfile2(int id , String pdf,String pdfName);

    /**
     * 下载文件
     */
    List<Supplier> getFile1(int id);

    List<Supplier>getBianma();

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Supplier> getAllList();

    /**
     * 修改
     */
    void update_supplier(String new_gongyingshang,String old_gongyingshang);
}
