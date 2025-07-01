const fs = require('fs/promises');
const path = require('path');

async function copyFiles() {
  const sourceDir = path.join(__dirname, 'docs/.vitepress/dist/');
  const targetDir = path.join(__dirname, './');

  try {
    // 读取源目录中的所有文件和文件夹
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        // 如果是目录，递归复制
        await fs.mkdir(targetPath, { recursive: true });
        await copyDirectory(sourcePath, targetPath);
      } else {
        // 如果是文件，直接复制
        await fs.copyFile(sourcePath, targetPath);
        console.log(`复制文件: ${sourcePath} -> ${targetPath}`);
      }
    }

    console.log('文件复制完成!');
  } catch (error) {
    console.error('复制过程中出错:', error);
  }
}

async function copyDirectory(source, target) {
  // 读取目录中的所有条目
  const entries = await fs.readdir(source, { withFileTypes: true });

  // 确保目标目录存在
  await fs.mkdir(target, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // 递归处理子目录
      await copyDirectory(sourcePath, targetPath);
    } else {
      // 复制文件
      await fs.copyFile(sourcePath, targetPath);
      console.log(`复制文件: ${sourcePath} -> ${targetPath}`);
    }
  }
}

// 执行复制操作
copyFiles();    