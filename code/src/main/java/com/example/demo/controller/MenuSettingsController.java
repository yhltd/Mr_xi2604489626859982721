package com.example.demo.controller;

import com.example.demo.entity.MenuSettings;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.IMenuSettingsService;
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

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList() {
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
    @RequestMapping("/queryList")
    public ResultInfo queryList(String query) {
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
    public ResultInfo add(@RequestBody HashMap map) {
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
     * @param menuSettingsJson
     * @return ResultInfo
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String menuSettingsJson) {
        MenuSettings menuSettings = null;
        try {
            menuSettings = DecodeUtil.decodeToJson(menuSettingsJson, MenuSettings.class);
            if (iMenuSettingsService.update(menuSettings)) {
                return ResultInfo.success("修改成功", menuSettings);
            } else {
                return ResultInfo.success("修改失败", menuSettings);
            }
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
    public ResultInfo delete(@RequestBody HashMap map) {
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
