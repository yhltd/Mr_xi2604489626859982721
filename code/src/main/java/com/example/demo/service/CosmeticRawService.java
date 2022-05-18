package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.CosmeticRaw;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/16 10:45
 */
@Service
public interface CosmeticRawService extends IService<CosmeticRaw> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<CosmeticRaw> getList(String production_place);

    /**
     * 模糊查询
     *
     * @return 信息集合
     */
    List<CosmeticRaw> queryList(String query);

    /**
     * 模糊查询
     *
     * @return 信息集合
     */
    List<CosmeticRaw> preciseQueryList(String query);

    /**
     * 添加
     *
     * @param cosmeticRaw 添加对象
     * @return 是否添加成功
     */
    CosmeticRaw add(CosmeticRaw cosmeticRaw);

    /**
     * 修改
     *
     * @param cosmeticRaw 修改对象
     * @return 是否修改成功
     */
    boolean update(CosmeticRaw cosmeticRaw);

    /**
     * 修改
     *
     * @param query 修改对象
     * @return 是否修改成功
     */
    boolean up1(String query,int id,String pdfname);

    /**
     * 修改
     *
     * @param query 修改对象
     * @return 是否修改成功
     */
    boolean up2(String query,int id,String pdfname);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 下载文件
     */
    List<CosmeticRaw> getFile1(int id);
}