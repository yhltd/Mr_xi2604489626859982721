package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Commodity;
import com.example.demo.entity.CosmeticRaw;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public interface ICommodityService extends IService<Commodity> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity> getList();

    /**
     * 模糊查询1
     *
     * @return 信息集合
     */
    List<Commodity> queryList1(String column_name1,String condition1);

    /**
     * 模糊查询2
     *
     * @return 信息集合
     */
    List<Commodity> queryList2(String column_name1,String condition1,String column_name2,String condition2);

    /**
     * 模糊查询3
     *
     * @return 信息集合
     */
    List<Commodity> queryList3(String column_name1,String condition1,String column_name2,String condition2,String column_name3,String condition3);

    /**
     * 添加
     *
     * @param commodity 添加对象
     * @return 是否添加成功
     */
    Commodity add(Commodity commodity);

    /**
     * 修改
     *
     * @param commodity 修改对象
     * @return 是否修改成功
     */
    boolean update(Commodity commodity);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 下载文件
     * @return
     */
    List<Commodity> getFile(int id);

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
}
