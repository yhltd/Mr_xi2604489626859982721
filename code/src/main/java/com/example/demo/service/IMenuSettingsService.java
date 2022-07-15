package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.MenuSettings;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/13 16:55
 */
@Service
public interface IMenuSettingsService extends IService<MenuSettings> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<MenuSettings> getList();

    /**
     * 查询
     *
     * @return 信息集合
     */
    List<MenuSettings> queryList(String query);

    /**
     * 添加
     *
     * @param menuSettings 添加对象
     * @return 是否添加成功
     */
    MenuSettings add(MenuSettings menuSettings);

    /**
     * 修改
     *
     * @param menuSettings 修改对象
     * @return 是否修改成功
     */
    boolean update(MenuSettings menuSettings);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);


    /**
     * 修改
     */
    void update_id(int id , String new_gongyingshang,String new_yuanliaopinpai,String new_wuzhifenlei,String new_wulixingtai);
}
