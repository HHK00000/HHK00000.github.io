# 定义源目录和目标目录（固定配置，无需修改）
SOURCE1="./HHK00000.github.io/index.html"
SOURCE2="./HHK00000.github.io/assets/"
SOURCE3="./HHK00000.github.io/document/"
DEST1="./"
DEST2="./assets/"
DEST3="./document/"

# ========== 新增：拷贝前先清空目标 ==========
echo "开始清空目标目录..."
# 清空目标文件/目录
rm -rf "${DEST1}index.html"
rm -rf "${DEST1}404.html"
rm -rf "${DEST1}hashmap.json"
rm -rf "${DEST1}vp-icons.css"
rm -rf "${DEST2}"
rm -rf "${DEST3}"
echo "目标目录清空完成。"
# ==========================================

# 拷贝文件
cp -rvpf "${SOURCE1}" "${DEST1}"
cp -rvpf "./HHK00000.github.io/404.html" "${DEST1}"
cp -rvpf "./HHK00000.github.io/hashmap.json" "${DEST1}"
cp -rvpf "./HHK00000.github.io/vp-icons.css" "${DEST1}"
cp -rvpf "${SOURCE2}" "${DEST2}"
cp -rvpf "${SOURCE3}" "${DEST3}"

# 脚本正常结束
echo "文件拷贝完成！"
exit 0