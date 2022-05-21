package com.example.demo.controller;

import com.example.demo.entity.Commodity;
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
            Sheet sheet = wb.getSheet("原料商品信息");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Commodity commodity = new Commodity();
                //获取第i行
                Row row = sheet.getRow(i);
                //原料编码
                Cell rawCode = row.getCell(0);
                if (rawCode != null) {
                    rawCode.setCellType(CellType.STRING);
                    commodity.setRawCode(rawCode.getStringCellValue());
                }
                //商品名称
                Cell goodsName = row.getCell(1);
                if (goodsName != null) {
                    goodsName.setCellType(CellType.STRING);
                    commodity.setGoodsName(goodsName.getStringCellValue());
                }
                //原料报送码
                Cell rawSubmissionCode = row.getCell(2);
                if (rawSubmissionCode != null) {
                    rawSubmissionCode.setCellType(CellType.STRING);
                    commodity.setRawSubmissionCode(rawSubmissionCode.getStringCellValue());
                }
                //产地
                Cell productionPlace = row.getCell(3);
                if (productionPlace != null) {
                    productionPlace.setCellType(CellType.STRING);
                    commodity.setProductionPlace(productionPlace.getStringCellValue());
                }
                //品牌名称
                Cell brandName = row.getCell(4);
                if (brandName != null) {
                    brandName.setCellType(CellType.STRING);
                    commodity.setBrandName(brandName.getStringCellValue());
                }
                //建议添加量%
                Cell addAmount = row.getCell(5);
                if (addAmount != null) {
                    addAmount.setCellType(CellType.STRING);
                    commodity.setAddAmount(addAmount.getStringCellValue());
                }
                //供应商简称
                Cell abbreviation = row.getCell(6);
                if (abbreviation != null) {
                    abbreviation.setCellType(CellType.STRING);
                    commodity.setAbbreviation(abbreviation.getStringCellValue());
                }
                //供应商公司名称
                Cell supplierName = row.getCell(7);
                if (supplierName != null) {
                    supplierName.setCellType(CellType.STRING);
                    commodity.setSupplierName(supplierName.getStringCellValue());
                }
                //溶解性
                Cell solubility = row.getCell(8);
                if (solubility != null) {
                    solubility.setCellType(CellType.STRING);
                    commodity.setSolubility(solubility.getStringCellValue());
                }
                //外观
                Cell appearance = row.getCell(9);
                if (appearance != null) {
                    appearance.setCellType(CellType.STRING);
                    commodity.setAppearance(appearance.getStringCellValue());
                }
                //气味
                Cell smell = row.getCell(10);
                if (smell != null) {
                    smell.setCellType(CellType.STRING);
                    commodity.setSmell(smell.getStringCellValue());
                }
                //物质标签
                Cell substanceLabel = row.getCell(11);
                if (substanceLabel != null) {
                    substanceLabel.setCellType(CellType.STRING);
                    commodity.setSubstanceLabel(substanceLabel.getStringCellValue());
                }
                //功效标签
                Cell efficacyLabel = row.getCell(12);
                if (efficacyLabel != null) {
                    efficacyLabel.setCellType(CellType.STRING);
                    commodity.setEfficacyLabel(efficacyLabel.getStringCellValue());
                }
                //原料标签
                Cell rawLabel = row.getCell(13);
                if (rawLabel != null) {
                    rawLabel.setCellType(CellType.STRING);
                    commodity.setRawLabel(rawLabel.getStringCellValue());
                }
                //专利信息
                Cell patent = row.getCell(14);
                if (patent != null) {
                    patent.setCellType(CellType.STRING);
                    commodity.setPatent(patent.getStringCellValue());
                }
                //产品性能
                Cell performance = row.getCell(15);
                if (performance != null) {
                    performance.setCellType(CellType.STRING);
                    commodity.setPerformance(performance.getStringCellValue());
                }
                //配伍禁忌
                Cell taboo = row.getCell(16);
                if (taboo != null) {
                    taboo.setCellType(CellType.STRING);
                    commodity.setTaboo(taboo.getStringCellValue());
                }
                //保存到数据库
                iCommodityService.add(commodity);
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
        }
    }

    @RequestMapping("/query")
    public ResultInfo query(HttpSession session, String priceMax, String priceMin, String contentMax, String contentMin, String column1, String condition1, String column2, String condition2, String column3, String condition3, String column4, String condition4, String column5, String condition5, String column6, String condition6) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("录入原料商品")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Commodity> queryList = null;
            String pinjie="";
            if (column1.equals("INCI中文名称") || column2.equals("INCI中文名称") || column3.equals("INCI中文名称") || column4.equals("INCI中文名称") || column5.equals("INCI中文名称") || column6.equals("INCI中文名称")) {
                String cn = "";
                if (column1.equals("INCI中文名称")) {
                    cn = condition1;
                } else if (column2.equals("INCI中文名称")) {
                    cn = condition2;
                } else if (column3.equals("INCI中文名称")) {
                    cn = condition3;
                } else if (column4.equals("INCI中文名称")) {
                    cn = condition4;
                } else if (column5.equals("INCI中文名称")) {
                    cn = condition5;
                }

                if(!column1.equals("INCI中文名称") && !column1.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column1+"`"+condition1;
                    }else{
                        pinjie=pinjie+"`"+column1+"`"+condition1;
                    }
                }
                if(!column2.equals("INCI中文名称") && !column2.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column2+"`"+condition2;
                    }else{
                        pinjie=pinjie+"`"+column2+"`"+condition2;
                    }
                }
                if(!column3.equals("INCI中文名称") && !column3.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column3+"`"+condition3;
                    }else{
                        pinjie=pinjie+"`"+column3+"`"+condition3;
                    }
                }
                if(!column4.equals("INCI中文名称") && !column4.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column4+"`"+condition4;
                    }else{
                        pinjie=pinjie+"`"+column4+"`"+condition4;
                    }
                }
                if(!column5.equals("INCI中文名称") && !column5.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column5+"`"+condition5;
                    }else{
                        pinjie=pinjie+"`"+column5+"`"+condition5;
                    }
                }
                if(!column6.equals("INCI中文名称") && !column6.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column6;
                    }else{
                        pinjie=pinjie+"`"+column6;
                    }
                }
                if(pinjie.split("`").length==0){
                    queryList=iCommodityService.getListChineseName1(cn,priceMax,priceMin,contentMax,contentMin);
                }else if(pinjie.split("`").length==2){
                    queryList=iCommodityService.getListChineseName2(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1]);
                }else if(pinjie.split("`").length==4){
                    queryList=iCommodityService.getListChineseName3(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3]);
                }else if(pinjie.split("`").length==6){
                    queryList=iCommodityService.getListChineseName4(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5]);
                }else if(pinjie.split("`").length==8){
                    queryList=iCommodityService.getListChineseName5(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7]);
                }else if(pinjie.split("`").length==10){
                    queryList=iCommodityService.getListChineseName6(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7],pinjie.split("`")[8],pinjie.split("`")[9]);
                }else if(pinjie.split("`").length==12){
                    queryList=iCommodityService.getListChineseName7(cn,priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7],pinjie.split("`")[8],pinjie.split("`")[9],pinjie.split("`")[10],pinjie.split("`")[11]);
                }
            } else {
                if(!column1.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column1+"`"+condition1;
                    }else{
                        pinjie=pinjie+"`"+column1+"`"+condition1;
                    }
                }
                if(!column2.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column2+"`"+condition2;
                    }else{
                        pinjie=pinjie+"`"+column2+"`"+condition2;
                    }
                }
                if(!column3.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column3+"`"+condition3;
                    }else{
                        pinjie=pinjie+"`"+column3+"`"+condition3;
                    }
                }
                if( !column4.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column4+"`"+condition4;
                    }else{
                        pinjie=pinjie+"`"+column4+"`"+condition4;
                    }
                }
                if(!column5.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column5+"`"+condition5;
                    }else{
                        pinjie=pinjie+"`"+column5+"`"+condition5;
                    }
                }
                if( !column6.equals("") ){
                    if(pinjie.equals("")){
                        pinjie=column6;
                    }else{
                        pinjie=pinjie+"`"+column6;
                    }
                }
                if(pinjie.split("`").length==0){
                    queryList=iCommodityService.getListChineseNameNot1(priceMax,priceMin,contentMax,contentMin);
                }else if(pinjie.split("`").length==2){
                    queryList=iCommodityService.getListChineseNameNot2(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1]);
                }else if(pinjie.split("`").length==4){
                    queryList=iCommodityService.getListChineseNameNot3(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3]);
                }else if(pinjie.split("`").length==6){
                    queryList=iCommodityService.getListChineseNameNot4(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5]);
                }else if(pinjie.split("`").length==8){
                    queryList=iCommodityService.getListChineseNameNot5(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7]);
                }else if(pinjie.split("`").length==10){
                    queryList=iCommodityService.getListChineseNameNot6(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7],pinjie.split("`")[8],pinjie.split("`")[9]);
                }else if(pinjie.split("`").length==12){
                    queryList=iCommodityService.getListChineseNameNot7(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7],pinjie.split("`")[8],pinjie.split("`")[9],pinjie.split("`")[10],pinjie.split("`")[11]);
                }else if(pinjie.split("`").length==14){
                    queryList=iCommodityService.getListChineseNameNot8(priceMax,priceMin,contentMax,contentMin,pinjie.split("`")[0],pinjie.split("`")[1],pinjie.split("`")[2],pinjie.split("`")[3],pinjie.split("`")[4],pinjie.split("`")[5],pinjie.split("`")[6],pinjie.split("`")[7],pinjie.split("`")[8],pinjie.split("`")[9],pinjie.split("`")[10],pinjie.split("`")[11],pinjie.split("`")[12],pinjie.split("`")[13]);
                }
            }
            //List<Commodity> queryList = iCommodityService.queryList2(column_name1,condition1,column_name2,condition2);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }

    }



}
