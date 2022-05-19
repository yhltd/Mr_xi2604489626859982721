package com.example.demo.controller;

import com.example.demo.entity.UserInfo;
import com.example.demo.service.IUserInfoService;
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
import java.util.Map;

/**
 * @author wanghui
 * @date 2022/05/13 14:38
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserInfoController {
    @Autowired
    private IUserInfoService iUserInfoService;

    @RequestMapping("/login")
    public ResultInfo login(HttpSession session, String username, String password) {
        try {
            //获取user
            Map<String, Object> map = iUserInfoService.login(username, password);

            //为Null则查询不到
            if (StringUtils.isEmpty(map)) {
                SessionUtil.remove(session, "token");
                SessionUtil.remove(session, "power");
                return ResultInfo.error(-1, "用户名密码错误");
            } else {
                SessionUtil.setToken(session, map.get("token").toString());
                SessionUtil.setPower(session, StringUtils.cast(map.get("power")));
                return ResultInfo.success("登陆成功", null);
            }
        } catch (Exception e) {
            log.error("登陆失败：{}", e.getMessage());
            log.error("参数：{}", username);
            log.error("参数：{}", password);
            return ResultInfo.error("错误!");
        }
    }


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
            List<UserInfo> getList = iUserInfoService.getList();
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
    public ResultInfo queryList(String username,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<UserInfo> queryList = iUserInfoService.queryList(username);
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
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            UserInfo userInfo = GsonUtil.toEntity(gsonUtil.get("addInfo"), UserInfo.class);
            userInfo = iUserInfoService.add(userInfo);
            if (StringUtils.isNotNull(userInfo)) {
                return ResultInfo.success("添加成功", userInfo);
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

        UserInfo userInfo = null;
        try {
            userInfo = DecodeUtil.decodeToJson(updateJson, UserInfo.class);
            if (iUserInfoService.update(userInfo)) {
                return ResultInfo.success("修改成功", userInfo);
            } else {
                return ResultInfo.success("修改失败", userInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", userInfo);
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
            if (iUserInfoService.delete(idList)) {
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
