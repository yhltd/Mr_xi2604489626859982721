package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Commodity_INCI;
import com.example.demo.entity.MenuSettings;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/19 19:43
 */
@Service
public interface ICommodity_INCIService extends IService<Commodity_INCI> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity_INCI> getList();

    /**
     * 添加
     *
     * @param commodity_INCI 添加对象
     * @return 是否添加成功
     */
    Commodity_INCI add(Commodity_INCI commodity_INCI);

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
     * @param commodity_INCI 修改对象
     * @return 是否修改成功
     */
    boolean update(Commodity_INCI commodity_INCI);

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Commodity_INCI> queryList(String query);

}
