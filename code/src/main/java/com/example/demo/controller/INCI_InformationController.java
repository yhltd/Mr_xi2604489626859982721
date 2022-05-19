package com.example.demo.controller;

import com.example.demo.entity.CIR_Security;
import com.example.demo.entity.INCI_Information;
import com.example.demo.service.INCI_InformationService;
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
 * @author wanghui
 * @date 2022/05/13 17:02
 */
@Slf4j
@RestController
@RequestMapping("/inci_information")
public class INCI_InformationController {

    @Autowired
    INCI_InformationService iNCI_InformationService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<INCI_Information> getList = iNCI_InformationService.getList();
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
        if (!powerUtil.isSelect("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<INCI_Information> queryList = iNCI_InformationService.queryList(query);
            return ResultInfo.success("获取成功", queryList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 精确查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/preciseQueryList")
    public ResultInfo preciseQueryList(String query,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<INCI_Information> queryList = iNCI_InformationService.preciseQueryList(query);
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
        if (!powerUtil.isAdd("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            INCI_Information iNCI_Information = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), INCI_Information.class);
            iNCI_Information = iNCI_InformationService.add(iNCI_Information);
            if (StringUtils.isNotNull(iNCI_Information)) {
                return ResultInfo.success("添加成功", iNCI_Information);
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
        if (!powerUtil.isUpdate("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        INCI_Information iNCI_Information = null;
        try {
            iNCI_Information = DecodeUtil.decodeToJson(menuSettingsJson, INCI_Information.class);
            if (iNCI_InformationService.update(iNCI_Information)) {
                return ResultInfo.success("修改成功", iNCI_Information);
            } else {
                return ResultInfo.success("修改失败", iNCI_Information);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", iNCI_Information);
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
        if (!powerUtil.isDelete("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (iNCI_InformationService.delete(idList)) {
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
     * 上传excel
     *
     * @param excel excel
     * @return ResultInfo
     */
    @PostMapping("/upload")
    public ResultInfo upload(String excel,HttpSession session) {
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("INCI数据查询");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                INCI_Information iNCI_Information = new INCI_Information();
                //获取第i行
                Row row = sheet.getRow(i);
                //序号
                Cell serialNumber = row.getCell(0);
                if (serialNumber != null) {
                    serialNumber.setCellType(CellType.STRING);
                    iNCI_Information.setSerialNumber(serialNumber.getStringCellValue());
                }
                //INCI名称/中文名称
                Cell chineseName = row.getCell(1);
                if (chineseName != null) {
                    chineseName.setCellType(CellType.STRING);
                    iNCI_Information.setChineseName(chineseName.getStringCellValue());
                }
                //INCI名称/英文名称
                Cell englishName = row.getCell(2);
                if (englishName != null) {
                    englishName.setCellType(CellType.STRING);
                    iNCI_Information.setEnglishName(englishName.getStringCellValue());
                }
                //淋洗类产品最高历史使用量（%）
                Cell rinsingProducts = row.getCell(3);
                if (rinsingProducts != null) {
                    rinsingProducts.setCellType(CellType.STRING);
                    iNCI_Information.setRinsingProducts(rinsingProducts.getStringCellValue());
                }
                //淋洗类产品最高历史使用量（%）
                Cell residentProducts = row.getCell(4);
                if (residentProducts != null) {
                    residentProducts.setCellType(CellType.STRING);
                    iNCI_Information.setResidentProducts(residentProducts.getStringCellValue());
                }
                //原料目录备注
                Cell rawRemarks = row.getCell(5);
                if (rawRemarks != null) {
                    rawRemarks.setCellType(CellType.STRING);
                    iNCI_Information.setRawRemarks(rawRemarks.getStringCellValue());
                }
                //主要使用目的
                Cell purpose = row.getCell(6);
                if (purpose != null) {
                    purpose.setCellType(CellType.STRING);
                    iNCI_Information.setPurpose(purpose.getStringCellValue());
                }
                //是否可能存在安全性风险物质
                Cell riskSubstance = row.getCell(7);
                if (riskSubstance != null) {
                    riskSubstance.setCellType(CellType.STRING);
                    iNCI_Information.setRiskSubstance(riskSubstance.getStringCellValue());
                }
                //安全风险
                Cell safetyRisk = row.getCell(8);
                if (safetyRisk != null) {
                    safetyRisk.setCellType(CellType.STRING);
                    iNCI_Information.setSafetyRisk(safetyRisk.getStringCellValue());
                }
                //保存到数据库
                iNCI_InformationService.add(iNCI_Information);
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
        }
    }


}
