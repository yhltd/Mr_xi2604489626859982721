package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.CIR_Security;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author huchao
 * @date 2022/05/14 13:36
 */
@Service
public interface CIR_SecurityService extends IService<CIR_Security> {
    /**
     * 查询
     *
     * @return 信息集合
     */
    List<CIR_Security> getList();

    /**
     * 模糊查询
     *
     * @return 信息集合
     */
    List<CIR_Security> queryList(String query);

    /**
     * 模糊查询
     *
     * @return 信息集合
     */
    List<CIR_Security> preciseQueryList(String query);

    /**
     * 添加
     *
     * @param cIR_Security 添加对象
     * @return 是否添加成功
     */
    CIR_Security add(CIR_Security cIR_Security);

    /**
     * 修改
     *
     * @param cIR_Security 修改对象
     * @return 是否修改成功
     */
    boolean update(CIR_Security cIR_Security);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);
}
