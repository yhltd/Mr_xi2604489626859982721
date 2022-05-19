package com.example.demo.controller;

import com.example.demo.entity.CIR_Security;
import com.example.demo.service.CIR_SecurityService;
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
@RequestMapping("/cir_security")
public class CIR_SecurityController {

    @Autowired
    CIR_SecurityService cIR_SecurityService;

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
            List<CIR_Security> getList = cIR_SecurityService.getList();
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
            List<CIR_Security> queryList = cIR_SecurityService.queryList(query);
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
        if (!powerUtil.isSelect("数据查询")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<CIR_Security> queryList = cIR_SecurityService.preciseQueryList(query);
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
            CIR_Security cIR_Security = GsonUtil.toEntity(gsonUtil.get("addUserInfo"), CIR_Security.class);
            cIR_Security = cIR_SecurityService.add(cIR_Security);
            if (StringUtils.isNotNull(cIR_Security)) {
                return ResultInfo.success("添加成功", cIR_Security);
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
        CIR_Security cIR_Security = null;
        try {
            cIR_Security = DecodeUtil.decodeToJson(menuSettingsJson, CIR_Security.class);
            if (cIR_SecurityService.update(cIR_Security)) {
                return ResultInfo.success("修改成功", cIR_Security);
            } else {
                return ResultInfo.success("修改失败", cIR_Security);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", cIR_Security);
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
            if (cIR_SecurityService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("CIR安全评估信息");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                CIR_Security cIR_Security = new CIR_Security();
                //获取第i行
                Row row = sheet.getRow(i);
                //序号
                Cell serialNumber = row.getCell(0);
                if (serialNumber != null) {
                    serialNumber.setCellType(CellType.STRING);
                    cIR_Security.setSerialNumber(serialNumber.getStringCellValue());
                }
                //INCI名称/中文名称
                Cell chineseName = row.getCell(1);
                if (chineseName != null) {
                    chineseName.setCellType(CellType.STRING);
                    cIR_Security.setChineseName(chineseName.getStringCellValue());
                }
                //INCI名称/英文名称
                Cell englishName = row.getCell(2);
                if (englishName != null) {
                    englishName.setCellType(CellType.STRING);
                    cIR_Security.setEnglishName(englishName.getStringCellValue());
                }
                //CIR安全评估
                Cell safetyAssessment = row.getCell(3);
                if (safetyAssessment != null) {
                    safetyAssessment.setCellType(CellType.STRING);
                    cIR_Security.setSafetyAssessment(safetyAssessment.getStringCellValue());
                }
                //保存到数据库
                cIR_SecurityService.add(cIR_Security);
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
