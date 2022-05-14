package com.example.demo.controller;

import com.example.demo.service.IUserInfoService;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import com.example.demo.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
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
                //SessionUtil.remove(session, "power");
                return ResultInfo.error(-1, "用户名密码错误");
            } else {
                SessionUtil.setToken(session, map.get("token").toString());
                //SessionUtil.setPower(session, StringUtils.cast(map.get("power")));
                return ResultInfo.success("登陆成功", null);
            }
        } catch (Exception e) {
            log.error("登陆失败：{}", e.getMessage());
            log.error("参数：{}", username);
            log.error("参数：{}", password);
            return ResultInfo.error("错误!");
        }
    }

}
