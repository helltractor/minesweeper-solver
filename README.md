# 🧠 Minesweeper Solver

一个为 [minesweeper.online](https://minesweeper.online) 编写的 Tampermonkey 脚本，实时分析当前扫雷局面，并一键跳转到第三方分析器 [mrgris minesweepr](https://mrgris.com/projects/minesweepr/demo/analyzer/) 进行辅助判断。

## ✨ 功能特点

* 遍历游戏当前状态（已点格、旗帜、未点格等）
* 实时构建可分析的局面字符串
* 动态生成“分析”按钮
* 一键跳转到第三方分析器，快速辅助决策

## 🔧 安装步骤

1. 安装浏览器插件 [Tampermonkey](https://www.tampermonkey.net/)
2. 点击“新增脚本”，将本项目代码复制粘贴进去，保存启用即可

## 🕹️ 使用方式

1. 打开 [https://minesweeper.online](https://minesweeper.online)
2. 开始游戏，脚本会每秒自动检测局面
3. 页面下方会出现按钮【分析】
4. 点击按钮，将跳转至分析工具查看下一步建议

## 💡 技术实现要点

* 使用 `setInterval` 每秒监听游戏状态
* DOM 操作获取地雷数量、地图行列与单元格状态
* 构建符合 [mrgris Minesweepr Analyzer](https://mrgris.com/projects/minesweepr/demo/analyzer/) 所需参数的 URL
* 动态创建按钮并挂载至游戏底部栏

## ⚠️ 注意事项

* 脚本仅供学习交流，请勿用于违反游戏规则的场景
* 第三方分析器非本项目所有，仅作辅助使用
