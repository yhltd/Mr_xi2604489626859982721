package com.example.demo.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.INCI_Information;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 16:55
 */
@Service
public interface INCI_InformationService extends IService<INCI_Information> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<INCI_Information> getList();

    /**
     * 模糊查询
     *
     * @return 信息集合
     */
    List<INCI_Information> queryList(String query);

    /**
     * 精确查询
     *
     * @return 信息集合
     */
    List<INCI_Information> preciseQueryList(String query);

    /**
     * 添加
     *
     * @param iNCI_Information 添加对象
     * @return 是否添加成功
     */
    INCI_Information add(INCI_Information iNCI_Information);

    /**
     * 修改
     *
     * @param iNCI_Information 修改对象
     * @return 是否修改成功
     */
    boolean update(INCI_Information iNCI_Information);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);
}
