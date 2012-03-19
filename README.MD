Readme for Project Pix
======================

目录说明
--------

* index.php
    + 主页，用来导航 demo 页面和视觉稿
    + 可能会加入其他东西

* build.cmd
    + 用于打包部署
    + build 目标目录为 build/，之后提交到 CDN/apps/pix/ 下

* tools/
    + 统一辅助工具，以免部分同学本地没有相关工具

* docs/
    + 分析文档、脑图和 PPT

* design/
    + 存放所有视觉稿
    + 有新的视觉稿后请更新 index.php

* action/
	+ 存放本地模拟的后台 ajax 响应
    + 基本的响应格式是
        <pre>{
            success: 1 or 0,
            data: {},
            msg: "" // 异常信息
        }</pre>

* page/
    + 存放所有页面
    + 页面平坦化于此目录下，不再细分目录
    + 新建的页面统一使用模板页面的格式
    + common/
        - 包含页头和页脚等公共部分
    + img/
        - 包含页面需要使用的图片元素，占位符

* src/
    + 存放样式和脚本
    + assets/
        - 存放 page 需要用到的 sprite 雪碧图
    + base/
        - DPL 部分，包括全局样式和脚本
        - 此 DPL 在编写的时候按照细粒度的方式拆分，比如 base.css 包含 button.css,
          header.css, etc.
    + page/
        - 页面级别的 js 和 css
        - 一个页面只对应一个 js 或 css，并且命名和相应的 page 命名一致
    + pixel/
        - pix 项目的业务模块们，一般是可解耦的、可重用的模块，供页面级的 js 调用
        - 符合 kissy loader 1.2 的模块编写标准
        - 之所以使用这个名字，是因为在 1.2 的 loader 中，已经废弃 KISSY.app
          方法，故而所有 mods 都会直接挂载到 KISSY 下。为了可读和防止冲突，取这个名字
        - *注意* 模块本身需要用到的样式或雪碧图，置于模块本身的目录下，便于解耦和动态加载
        - mod-name/
            * pixel/ 目录下平坦地存放每一个模块，模块以模块名命名自己的文件夹
            * 模块中包含自己的 js 和 css（如果需要的话），可随意切割粒度
            * 保证有一个 index.js 用来依赖所有需要的脚本，对外提供一个包装接口
            * 模块文件夹中可以有一个 tests 文件夹，用于存放此模块的测试用例
    + external/
        - 单独服务于外部环境的脚本
        - 可能使用原生 js 编写

* build/
    + 合并、压缩、目录变换后的 js / css 存放点
    + 最终提交到 cdn
    + 根目录下直接是 base.js / base.css
    + page/
        - 页面级别的 js 和 css
        - 和 src/page/ 结构一致
    + pixel/
        - 模块
        - 和 src/pixel/ 结构基本一致
        - 每一个模块中的脚本都被压缩为 index.js
        - use 的时候语法使用
            <pre>KISSY.use("pixel/mod-name/", function(S, Mod) {
                // 注意 mod-name 后面有个斜杠，代表请求的是其目录下的 index.js 文件
            })</pre>

词汇表
-------

1. pix | 项目名
2. pix- | DPL 的 className 前缀，用于 DPL 样式的选择器，以及公共模块的脚本钩子
