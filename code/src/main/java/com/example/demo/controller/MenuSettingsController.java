package com.example.demo.controller;

import com.example.demo.entity.MenuSettings;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.CosmeticRawService;
import com.example.demo.service.ILabelService;
import com.example.demo.service.IMenuSettingsService;
import com.example.demo.service.ISupplierService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/13 17:02
 */
@Slf4j
@RestController
@RequestMapping("/menu_settings")
public class MenuSettingsController {

    @Autowired IMenuSettingsService iMenuSettingsService;
    @Autowired ISupplierService iSupplierService;
    @Autowired CosmeticRawService cosmeticRawService;
    @Autowired ILabelService iLabelService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<MenuSettings> getList = iMenuSettingsService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getMenuSettings")
    public ResultInfo getMenuSettings(HttpSession session) {
        try {
            List<MenuSettings> getList = iMenuSettingsService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
    /**
     * 标签查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getMenuSettingslabel")
    public ResultInfo getMenuSettingslabel(HttpSession session,String add_type) {
        try {
            List<MenuSettings> queryListlabel = iMenuSettingsService.queryListlabel(add_type);
            return ResultInfo.success("获取成功", queryListlabel);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String query,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<MenuSettings> queryList = iMenuSettingsService.queryList(query);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 添加
     *
     * @param map
     * @return ResultInfo
     */
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody HashMap map,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            MenuSettings menuSettings = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), MenuSettings.class);
            menuSettings = iMenuSettingsService.add(menuSettings);
            if (StringUtils.isNotNull(menuSettings)) {
                return ResultInfo.success("添加成功", menuSettings);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("添加失败");
        }
    }
    /**
     * 修改
     *
     * @return ResultInfo
     */
    @RequestMapping(value = "/update")
    public ResultInfo update(int id,HttpSession session,String new_gongyingshang,String old_gongyingshang,String new_yuanliaopinpai,String old_yuanliaopinpai,String new_wuzhifenlei,String old_wuzhifenlei,String new_wulixingtai,String old_wulixingtai) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        MenuSettings menuSettings = null;
        try {
            iMenuSettingsService.update_id(id,new_gongyingshang,new_yuanliaopinpai,new_wuzhifenlei,new_wulixingtai);
            if(new_gongyingshang != "" && old_gongyingshang != ""){
                iSupplierService.update_supplier(new_gongyingshang,old_gongyingshang);
            }
            if(new_yuanliaopinpai != "" && old_yuanliaopinpai != ""){
                cosmeticRawService.update_brand(new_yuanliaopinpai,old_yuanliaopinpai);
            }
            if(new_wuzhifenlei != "" && old_wuzhifenlei != ""){
                iLabelService.update_label(new_wuzhifenlei,old_wuzhifenlei);
            }
            if(new_wulixingtai != "" && old_wulixingtai != ""){
                iLabelService.update_label(new_wulixingtai,old_wulixingtai);
            }
            return ResultInfo.success("修改成功", menuSettings);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", menuSettings);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @param map
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (iMenuSettingsService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", idList);
            return ResultInfo.error("删除失败");
        }
    }


}
