package com.example.demo.controller;

import com.example.demo.entity.Commodity;
import com.example.demo.entity.Commodity_Price;
import com.example.demo.service.ICommodity_PriceService;
import com.example.demo.service.ICommodityService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;

/**
 * @author huchao
 * @date 2022/05/20 17:02
 */
@Slf4j
@RestController
@RequestMapping("/commodity_price")
public class Commodity_PriceController {

    @Autowired
    ICommodity_PriceService iCommodity_PriceService;

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
            List<Commodity_Price> getList = iCommodity_PriceService.getList();
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
            Commodity_Price commodity_Price = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), Commodity_Price.class);
            commodity_Price = iCommodity_PriceService.add(commodity_Price);
            if (StringUtils.isNotNull(commodity_Price)) {
                return ResultInfo.success("添加成功", commodity_Price);
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
            if (iCommodity_PriceService.delete(idList)) {
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
        Commodity_Price commodity_Price = null;
        try {
            commodity_Price = DecodeUtil.decodeToJson(menuSettingsJson, Commodity_Price.class);
            if (iCommodity_PriceService.update(commodity_Price)) {
                return ResultInfo.success("修改成功", commodity_Price);
            } else {
                return ResultInfo.success("修改失败", commodity_Price);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", commodity_Price);
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
        if (!powerUtil.isSelect("系统设置")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity_Price> queryList = iCommodity_PriceService.queryList(query);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /**
     * 上传excel
     *
     * @param excel excel
     * @return ResultInfo
     */
    @PostMapping("/upload")
    public ResultInfo upload(String excel,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("原料成本信息");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Commodity_Price commodity_Price = new Commodity_Price();
                //获取第i行
                Row row = sheet.getRow(i);

                Cell rawCode = row.getCell(0);

                Cell goodsName = row.getCell(1);

                Cell rawSubmissionCode = row.getCell(2);

                Cell productionPlace = row.getCell(3);

                Cell brandName = row.getCell(4);

                Cell abbreviation = row.getCell(5);

                Cell supplierName = row.getCell(6);

                //查询id
                if (rawCode != null && goodsName != null && rawSubmissionCode != null && productionPlace != null && brandName != null && abbreviation != null && supplierName != null) {
                    rawCode.setCellType(CellType.STRING);
                    goodsName.setCellType(CellType.STRING);
                    rawSubmissionCode.setCellType(CellType.STRING);
                    productionPlace.setCellType(CellType.STRING);
                    brandName.setCellType(CellType.STRING);
                    supplierName.setCellType(CellType.STRING);
                    List<Commodity> eiIdList = iCommodityService.getCoId(rawCode.getStringCellValue(), goodsName.getStringCellValue(), rawSubmissionCode.getStringCellValue(), productionPlace.getStringCellValue(), brandName.getStringCellValue(), abbreviation.getStringCellValue(), supplierName.getStringCellValue());
                    if (eiIdList.size() == 0){
                        continue;
                    }
                }

                //成本
                Cell price = row.getCell(8);
                if (price != null) {
                    price.setCellType(CellType.STRING);
                    commodity_Price.setPrice(price.getStringCellValue());
                }
                //规格
                Cell unit = row.getCell(7);
                if (unit != null) {
                    unit.setCellType(CellType.STRING);
                    commodity_Price.setUnit(unit.getStringCellValue());
                }

                //保存到数据库
                iCommodity_PriceService.add(commodity_Price);
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
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
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity_Price> getList = iCommodity_PriceService.getListById(id);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }



}
