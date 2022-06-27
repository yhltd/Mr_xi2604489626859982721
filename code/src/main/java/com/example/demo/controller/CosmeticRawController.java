package com.example.demo.controller;

import com.example.demo.entity.CosmeticRaw;
import com.example.demo.service.CosmeticRawService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;


/**
 * @author wanghui
 * @date 2022/05/13 17:02
 */
@Slf4j
@RestController
@RequestMapping("/cosmetic_raw")
public class CosmeticRawController {

    @Autowired
    CosmeticRawService cosmeticRawService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(String production_place, HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CosmeticRaw> getList = cosmeticRawService.getList(production_place);
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
    @RequestMapping("/getList2")
    public ResultInfo getList2(HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CosmeticRaw> getList = cosmeticRawService.getList2();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 模糊查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String query,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CosmeticRaw> queryList = cosmeticRawService.queryList(query);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 模糊查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/preciseQueryList")
    public ResultInfo preciseQueryList(String query,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CosmeticRaw> queryList = cosmeticRawService.preciseQueryList(query);
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
        if (!powerUtil.isAdd("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            CosmeticRaw cosmeticRaw = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), CosmeticRaw.class);
            cosmeticRaw = cosmeticRawService.add(cosmeticRaw);
            if (StringUtils.isNotNull(cosmeticRaw)) {
                return ResultInfo.success("添加成功", cosmeticRaw);
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
        if (!powerUtil.isUpdate("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        CosmeticRaw cosmeticRaw = null;
        try {
            cosmeticRaw = DecodeUtil.decodeToJson(menuSettingsJson, CosmeticRaw.class);
            if (cosmeticRawService.update(cosmeticRaw)) {
                return ResultInfo.success("修改成功", cosmeticRaw);
            } else {
                return ResultInfo.success("修改失败", cosmeticRaw);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", cosmeticRaw);
            return ResultInfo.error("修改失败");
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
        if (!powerUtil.isUpdate("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            if (cosmeticRawService.up1(query,id,pdfName)) {
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
        if (!powerUtil.isUpdate("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            if (cosmeticRawService.up2(query,id,pdfName)) {
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
     * 删除
     *
     * @param map
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (cosmeticRawService.delete(idList)) {
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
        if (!powerUtil.isSelect("原料品牌")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CosmeticRaw> getList = cosmeticRawService.getFile1(id);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查编号
     *
     * @return ResultInfo
     */
    @RequestMapping("/getBianma")
    public ResultInfo getBianma() {
        try {
            List<CosmeticRaw> getList = cosmeticRawService.getBianma();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


}
