
# 定义源目录和目标目录（固定配置，无需修改）
SOURCE1="./HHK00000.github.io/index.html"
SOURCE2="./HHK00000.github.io/assets/"
SOURCE3="./HHK00000.github.io/document/"
DEST1="./"
DEST2="./assets/"
DEST3="./document/"

cp -rvpf "./HHK00000.github.io/index.html" "$DEST1"
cp -rvpf "./HHK00000.github.io/assets/" "assets"
cp -rvpf "./HHK00000.github.io/document/" "document"


# 脚本正常结束
exit 0