package com.example.demo.controller;

import com.example.demo.entity.FileTable;
import com.example.demo.entity.Label;
import com.example.demo.entity.UserPower;
import com.example.demo.service.IFileTableService;
import com.example.demo.util.DecodeUtil;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.StringUtils;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Array;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

/**
 * @author wanghui
 * @date 2022/06/16 9:51
 */
@Slf4j
@RestController
@RequestMapping("/file_table")
public class FileTableController {
    @Autowired
    IFileTableService iFileTableService;

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(int otherId, String type) {
        try{
            List<FileTable>getList=iFileTableService.getList(otherId,type);
            return ResultInfo.success("获取成功", getList);
        }catch (Exception e){
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
    public ResultInfo add(@RequestBody HashMap map,HttpSession session){
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try{
            FileTable fileTable= GsonUtil.toEntity(gsonUtil.get("addInfo"), FileTable.class);
            if (iFileTableService.insert(fileTable)) {
                return ResultInfo.success("添加成功", fileTable);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }
//    public ResultInfo add(String fileName,String files,int otherId,String type){
//        try{
//            iFileTableService.insert(fileName,files,otherId,type);
//            return ResultInfo.success("添加成功", null);
//        }catch (Exception e){
//            e.printStackTrace();
//            log.error("添加失败：{}", e.getMessage());
//            return ResultInfo.error("添加失败");
//        }
//    }


    /**
     * 删除
     *
     * @param map
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (iFileTableService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", idList);
            return ResultInfo.error("删除失败");
        }
    }

    /**
     * 查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/getFile")
    public ResultInfo getFile(int id) {
        try{
            List<FileTable>getList=iFileTableService.getFile(id);
            return ResultInfo.success("获取成功", getList);
        }catch (Exception e){
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


}
