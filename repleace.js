const fs = require('fs/promises');
const path = require('path');

/**
 * 递归遍历目录并替换 HTML 文件内容
 * @param {string} dirPath - 目标目录路径
 * @param {RegExp} searchPattern - 要替换的内容匹配模式
 * @param {string} replacement - 替换文本
 */
async function replaceInHtmlFiles(dirPath, searchPattern, replacement) {
  try {
    // 读取目录内容
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    // 遍历目录中的每个条目
    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // 递归处理子目录
        await replaceInHtmlFiles(entryPath, searchPattern, replacement);
      } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.html') {
        // 处理 HTML 文件
        await processHtmlFile(entryPath, searchPattern, replacement);
      }
    }
    
    console.log('✅ 所有 HTML 文件处理完成');
  } catch (err) {
    console.error('❌ 处理过程中出错:', err);
  }
}

/**
 * 处理单个 HTML 文件：读取、替换、写回
 */
async function processHtmlFile(filePath, searchPattern, replacement) {
  try {
    // 读取文件内容
    const content = await fs.readFile(filePath, 'utf8');
    
    // 替换内容
    const newContent = content.replaceAll(searchPattern, replacement);
    
    // 如果内容有变化，则写回文件
    if (newContent !== content) {
      await fs.writeFile(filePath, newContent, 'utf8');
      console.log(`✏️ 已修改: ${filePath}`);
    } else {
      console.log(`⏩ 未修改: ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ 处理文件失败: ${filePath}`, err);
  }
}

// 使用示例
(async () => {
  const targetDir = './docs/.vitepress/dist'; // 替换为你的目录路径
  let searchPattern = '/assets'; // 替换为你要匹配的模式
  let replacement = '/blog/HHK00000.github.io/assets'; // 替换为你要替换的内容
  await replaceInHtmlFiles(targetDir, searchPattern, replacement);
  searchPattern = '/document'; // 替换为你要匹配的模式
  replacement = '/blog/HHK00000.github.io/document'; // 替换为你要替换的内容
  await replaceInHtmlFiles(targetDir, searchPattern, replacement);
  
})();