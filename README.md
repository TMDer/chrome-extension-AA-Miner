# chrome-extension-AA-Miner
Chrome extension for AA Miner

### 資料夾結構

```
├── AA-Miner-icon-128.png          # browser action 主視覺 icon
├── background.js                  # 在瀏覽器背景所運行的 JS ex: 監聽 tab update
├── inject.css                     # tab 頁面所要執行的 CSS
├── inject.js                      # tab 頁面所要執行的 JS
├── jquery-2.0.0.min.js            # jQuery
├── manifest.json                  # 主要設定檔
├── popup.css                      # 彈出視窗樣式
├── popup.html                     # 彈出視窗 HTML
├── popup.js                       # 彈出視窗 JS

```


### 上架教學

* 如何上版
    * [Chrome Webstore 發布連結](https://chrome.google.com/webstore/developer/dashboard)
    * [官方上架教學](https://developer.chrome.com/webstore/get_started_simple)  


* 上架 Chrome Store 步驟：
    1. Chrome extension 頁面點選封裝擴充功能。
    2. 在彈出的視窗點選擴充功能目錄的瀏覽。
    3. 再點選封裝擴充功能。
    4. 封裝後會產生 `*.crx (package)` 和 `*.pem (key)` 檔案，將產生 `*.pem` 改名成 `key.pem` 放入 extension folder 根目錄，並將整個目錄打包到 zip ，可以使用這個 zip 上架到 Chrome Store。第一次不需要選取秘密金鑰，`*.pem` 檔案請務必保留，未來如果要更新 extension 時都要使用相同的 key。`*.crx` 應該是用在 application 上，可以直接在 Ｃhrome 安裝，但上架用不到。
    5. 上架第一次要付 5美元 (一次性)，[發布連結](https://chrome.google.com/webstore/developer/dashboard)