package com.example.demo.controller;

import com.example.demo.entity.Supplier;
import com.example.demo.service.ISupplierService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/05/16 13:27
 */
@Slf4j
@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    ISupplierService iSupplierService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(String supplier, HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Supplier> getList = iSupplierService.getList(supplier);
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
    public ResultInfo queryList(String supplier, String query,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Supplier> queryList = iSupplierService.queryList(supplier, query);
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
    @RequestMapping("/add")
    public ResultInfo add(String supplierCode, String type, String abbreviation, String supplierName,
                          String url, String pdf1, String pdf2,String company,HttpSession session ) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            iSupplierService.add(supplierCode,type,abbreviation,supplierName,url,pdf1,pdf2,company);
            return ResultInfo.success("添加成功", null);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 修改基本信息
     *
     * @param supplierJson 要修改的json
     * @return ResultInfo
     */
    @PostMapping("/update")
    public ResultInfo update(@RequestBody String supplierJson,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            Supplier supplier = DecodeUtil.decodeToJson(supplierJson, Supplier.class);
            int id = supplier.getId();
            String supplierCode = supplier.getSupplierCode();
            String type = supplier.getType();
            String abbreviation = supplier.getAbbreviation();
            String supplierName = supplier.getSupplierName();
            String url = supplier.getUrl();
            String company = supplier.getCompany();
            iSupplierService.update(id, supplierCode, type, abbreviation, supplierName, url,company);
            return ResultInfo.success("修改成功", supplier);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", supplierJson);
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
        if (!powerUtil.isDelete("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (iSupplierService.delete(idList)) {
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
     * 上传文件
     *
     * @return ResultInfo
     */
    @RequestMapping("/upfile1")
    public ResultInfo upfile1(int id,String pdf,String pdfName,HttpSession session){
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            iSupplierService.upfile1(id,pdf,pdfName);
            return ResultInfo.success("上传成功", pdf);
        }catch (Exception e){
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            log.error("参数：{}", pdf);
            return ResultInfo.error("上传失败");
        }
    }

    /**
     * 上传文件
     *
     * @return ResultInfo
     */
    @RequestMapping("/upfile2")
    public ResultInfo upfile2(int id,String pdf,String pdfName,HttpSession session){
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            iSupplierService.upfile2(id,pdf,pdfName);
            return ResultInfo.success("上传成功", pdf);
        }catch (Exception e){
            e.printStackTrace();
            log.error("上传失败：{}", e.getMessage());
            log.error("参数：{}", pdf);
            return ResultInfo.error("上传失败");
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
        if (!powerUtil.isSelect("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Supplier> getList = iSupplierService.getFile1(id);
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
            List<Supplier> getList = iSupplierService.getBianma();
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
    @RequestMapping("/getAllList")
    public ResultInfo getAllList(HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("供应商")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Supplier> list = iSupplierService.getAllList();
            return ResultInfo.success("获取成功", list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

}
