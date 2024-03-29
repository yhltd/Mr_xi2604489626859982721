package com.example.demo.controller;

import com.example.demo.entity.Commodity_INCI;
import com.example.demo.entity.INCI_Information;
import com.example.demo.service.ICommodity_INCIService;
import com.example.demo.service.INCI_InformationService;
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
 * @author huchao
 * @date 2022/05/20 17:02
 */
@Slf4j
@RestController
@RequestMapping("/commodity_inci")
public class Commodity_INCIController {

    @Autowired
    ICommodity_INCIService iCommodity_INCIService;
    @Autowired
    INCI_InformationService inci_informationService;
    @Autowired
    ICommodity_INCIService iCommodity_inciService;

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
            List<Commodity_INCI> getList = iCommodity_INCIService.getList();
            return ResultInfo.success("获取成功", getList);
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
            Commodity_INCI commodity_INCI = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), Commodity_INCI.class);
            commodity_INCI = iCommodity_INCIService.add(commodity_INCI);
            if (StringUtils.isNotNull(commodity_INCI)) {
                return ResultInfo.success("添加成功", commodity_INCI);
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
            if (iCommodity_INCIService.delete(idList)) {
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
        Commodity_INCI commodity_INCI = null;
        try {
            commodity_INCI = DecodeUtil.decodeToJson(menuSettingsJson, Commodity_INCI.class);
            if (iCommodity_INCIService.update(commodity_INCI)) {
                return ResultInfo.success("修改成功", commodity_INCI);
            } else {
                return ResultInfo.success("修改失败", commodity_INCI);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", commodity_INCI);
            return ResultInfo.error("修改失败");
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
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity_INCI> queryList = iCommodity_INCIService.queryList(query);
            return ResultInfo.success("获取成功", queryList);
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
    @RequestMapping("/getListById")
    public ResultInfo getListById(int id,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity_INCI> queryList = iCommodity_INCIService.getListById(id);
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
     * @return ResultInfo
     */
    @RequestMapping("/insert")
    public ResultInfo insert(HttpSession session,int commodityId,String cas,String content,int inciId) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            iCommodity_INCIService.insert(commodityId,cas,content,inciId);
                return ResultInfo.success("添加失败", null);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 添加
     *
     * @return ResultInfo
     */
    @RequestMapping("/incichn")
    public ResultInfo incichn(String inci_chn1,String inci_chn2,String inci_chn,int id,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
//        int a=0;
//        int a1=0;
//        int a2=0;
//        for(int i=0;i<inci_chn.split("、").length;i++){
//            a=i;
//        }
//        for(int i=0;i<inci_chn1.split("、").length;i++){
//            a1=i;
//        }
//        for(int i=0;i<inci_chn2.split("、").length;i++){
//            a2=i;
//        }
        try {
            if (inci_chn1 != "" && inci_chn1 != "" && inci_chn2 != ""){
                if(inci_chn.split("、").length == inci_chn1.split("、").length && inci_chn.split("、").length == inci_chn2.split("、").length && inci_chn1.split("、").length == inci_chn2.split("、").length){
                    for(int i=0;i<inci_chn.split("、").length;i++){
                        List<INCI_Information>list=inci_informationService.getListByChnName(inci_chn.split("、")[i]);
                        if (list.size()>0) {
                            iCommodity_inciService.insert(id,inci_chn1.split("、")[i],inci_chn2.split("、")[i],list.get(0).getId());
                        }
                    }
                    return ResultInfo.success("添加成功");
                }
            }else{
                return ResultInfo.success("INIC中文名称，CAS，成分含量不能为空");
            }

//            for(int i=0;i<inci_chn.split("、").length;i++){
//                List<INCI_Information>list=inci_informationService.getListByChnName(inci_chn.split("、")[i]);
//                if (list.size()>0) {
//                    iCommodity_inciService.insert(id,"","",list.get(0).getId());
//                }
//            }
            return ResultInfo.success("INIC中文名称，CAS，成分含量输入的个数不一致");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }

}