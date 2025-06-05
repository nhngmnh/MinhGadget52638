import fs from 'fs'
import productModel from '../models/productModel.js';
async function exportProductsToMarkdown() {
  try {
    const products = await productModel.find();

    let mdContent = '# Danh sách sản phẩm\n\n';

    for (const p of products) {
      mdContent += `## ${p.name}\n`;
      mdContent += `- Danh mục: ${p.category}\n`;
      mdContent += `- Thương hiệu: ${p.brand || 'Không rõ'}\n`;
      mdContent += `- Giá: ${p.price.toLocaleString('vi-VN')}đ\n`;
      mdContent += `- Bán chạy: ${p.bestseller ? '✅ Có' : '❌ Không'}\n`;
      mdContent += `- Mô tả: ${p.description || 'Không có'}\n`;

      // Xử lý specifications
      if (p.specifications && typeof p.specifications === 'object') {
        mdContent += `- Thông số:\n`;

        if (Array.isArray(p.specifications)) {
          for (const spec of p.specifications) {
            mdContent += `  - ${spec}\n`;
          }
        } else {
          for (const [key, value] of Object.entries(p.specifications)) {
            mdContent += `  - ${key}: ${value}\n`;
          }
        }
      }

      mdContent += '\n';
    }

    fs.writeFileSync('products.md', mdContent, 'utf8');
    console.log('Đã ghi lại toàn bộ file products.md');
  } catch (err) {
    console.error('Lỗi ghi file products.md:', err);
  }
}

export {
  exportProductsToMarkdown
};
