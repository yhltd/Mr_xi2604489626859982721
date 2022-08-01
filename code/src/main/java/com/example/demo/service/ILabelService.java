package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Label;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 10:23
 */
@Service
public interface ILabelService extends IService<Label> {

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Label> getList(String type);

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<Label> queryList(String type, String query);

    /**
     * 添加
     *
     * @param label 添加对象
     * @return 是否添加成功
     */
    Label add(Label label);

    /**
     * 修改
     *
     * @param label 修改对象
     * @return 是否修改成功
     */
    boolean update(Label label);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);


    List<Label> wuzhiList();

    /**
     * 修改
     */
    void update_label(String new_label,String old_label);

    List<Label> getListByWuZhi();

    List<Label> getListByWuLi();

}
