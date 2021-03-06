package com.example.demo.controller;

import com.example.demo.entity.UserPower;
import com.example.demo.service.IUserPowerService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/19 14:37
 */
@Slf4j
@RestController
@RequestMapping("/user_power")
public class UserPowerController {
    @Autowired
    IUserPowerService iUserPowerService;

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
            List<UserPower> getList = iUserPowerService.getList();
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
    public ResultInfo queryList(String username, HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<UserPower> queryList = iUserPowerService.queryList(username);
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
            UserPower userPower = GsonUtil.toEntity(gsonUtil.get("addInfo"), UserPower.class);
            userPower = iUserPowerService.add(userPower);
            if (StringUtils.isNotNull(userPower)) {
                return ResultInfo.success("添加成功", userPower);
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
     * @param updateJson
     * @return ResultInfo
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String updateJson,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        UserPower userPower = null;
        try {
            userPower = DecodeUtil.decodeToJson(updateJson, UserPower.class);
            if (iUserPowerService.update(userPower)) {
                return ResultInfo.success("修改成功", userPower);
            } else {
                return ResultInfo.success("修改失败", userPower);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", userPower);
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
            if (iUserPowerService.delete(idList)) {
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
