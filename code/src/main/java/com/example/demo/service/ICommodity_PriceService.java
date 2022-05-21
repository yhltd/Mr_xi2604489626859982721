package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Commodity_Price;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public interface ICommodity_PriceService extends IService<Commodity_Price> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity_Price> getList();

    /**
     * 添加
     *
     * @param commodity_Price 添加对象
     * @return 是否添加成功
     */
    Commodity_Price add(Commodity_Price commodity_Price);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 修改
     *
     * @param commodity_Price 修改对象
     * @return 是否修改成功
     */
    boolean update(Commodity_Price commodity_Price);

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity_Price> queryList(String query);

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity_Price> getListById(int id);

}
