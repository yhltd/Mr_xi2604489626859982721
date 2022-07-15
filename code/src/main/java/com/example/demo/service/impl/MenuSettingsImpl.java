package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.MenuSettings;
import com.example.demo.mapper.MenuSettingsMapper;
import com.example.demo.service.IMenuSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/13 16:56
 */
@Service
public class MenuSettingsImpl extends ServiceImpl<MenuSettingsMapper, MenuSettings> implements IMenuSettingsService {

    @Autowired MenuSettingsMapper menuSettingsMapper;

    @Override
    public List<MenuSettings> getList() {
        return this.list();
    }

    @Override
    public List<MenuSettings> queryList(String query) {
        return menuSettingsMapper.queryList(query);
    }

    @Override
    public MenuSettings add(MenuSettings menuSettings) {
        return this.save(menuSettings) ? menuSettings : null;
    }

    @Override
    public boolean update(MenuSettings menuSettings) {
        return this.updateById(menuSettings);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public void update_id(int id , String new_gongyingshang,String new_yuanliaopinpai,String new_wuzhifenlei,String new_wulixingtai) {
        menuSettingsMapper.update_id(id,new_gongyingshang,new_yuanliaopinpai,new_wuzhifenlei,new_wulixingtai);
    }
}
