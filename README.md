# Spotify Ad Refresh

自动检测并跳过 Spotify Web Player 广告的用户脚本。检测到广告时刷新页面，刷新后自动恢复播放。

## 安装

1. 在浏览器中安装 **Tampermonkey** 扩展（[Chrome](https://www.tampermonkey.net/) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)）
2. 打开 Tampermonkey 面板，选择「创建新脚本」
3. 将 `index.js` 的全部内容粘贴进去，保存即可

## 工作原理

- 每 1.5 秒检测页面中是否出现广告元素
- 检测到广告后，先在 `localStorage` 中标记待恢复，然后刷新页面
- 页面刷新后自动查找播放按钮并点击，恢复之前的播放

## 注意事项

- 仅对 `https://open.spotify.com/*` 生效
- 页面刷新会导致短暂中断（约 2-3 秒）
- 如果你有 Spotify Premium，不需要此脚本

## 许可证

MIT
