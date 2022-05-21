package com.example.demo.controller;

import com.example.demo.entity.Commodity;
import com.example.demo.service.ICommodityService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author huchao
 * @date 2022/05/20 17:02
 */
@Slf4j
@RestController
@RequestMapping("/commodity")
public class CommodityController {

    @Autowired
    ICommodityService iCommodityService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> getList = iCommodityService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 模糊查询1
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList1")
    public ResultInfo queryList1(String column_name1,String condition1,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> queryList = iCommodityService.queryList1(column_name1,condition1);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 模糊查询2
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList2")
    public ResultInfo queryList2(String column_name1,String condition1,String column_name2,String condition2,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> queryList = iCommodityService.queryList2(column_name1,condition1,column_name2,condition2);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 模糊查询3
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList3")
    public ResultInfo queryList3(String column_name1,String condition1,String column_name2,String condition2,String column_name3,String condition3,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> queryList = iCommodityService.queryList3(column_name1,condition1,column_name2,condition2,column_name3,condition3);
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
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Commodity commodity = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), Commodity.class);
            commodity = iCommodityService.add(commodity);
            if (StringUtils.isNotNull(commodity)) {
                return ResultInfo.success("添加成功", commodity);
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
    public ResultInfo update(@RequestBody String menuSettingsJson,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        Commodity commodity = null;
        try {
            commodity = DecodeUtil.decodeToJson(menuSettingsJson, Commodity.class);
            if (iCommodityService.update(commodity)) {
                return ResultInfo.success("修改成功", commodity);
            } else {
                return ResultInfo.success("修改失败", commodity);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", commodity);
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
        if (!powerUtil.isDelete("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (iCommodityService.delete(idList)) {
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

    /**
     * 下载
     *
     * @return ResultInfo
     */
    @RequestMapping("/getFile")
    public ResultInfo getFile(int id,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> getList = iCommodityService.getFile(id);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 上传pdf1
     *
     * @return ResultInfo
     */
    @RequestMapping("/up1")
    public ResultInfo up1(String query,int id,String pdfName,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            if (iCommodityService.up1(query,id,pdfName)) {
                return ResultInfo.success("上传成功", query);
            }else{
                return ResultInfo.success("上传失败", query);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            log.error("参数：{}", query);
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 上传pdf2
     *
     * @return ResultInfo
     */
    @RequestMapping("/up2")
    public ResultInfo up2(String query, int id, String pdfName, HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            if (iCommodityService.up2(query,id,pdfName)) {
                return ResultInfo.success("上传成功", query);
            }else{
                return ResultInfo.success("上传失败", query);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            log.error("参数：{}", query);
            return ResultInfo.error("错误!");
        }
    }



}
