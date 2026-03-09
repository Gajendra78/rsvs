const fs = require('fs');
const path = require('path');

const layouts = [
  '/app/(protected)/student/layout.tsx',
  '/app/(protected)/admin/layout.tsx',
  '/app/(protected)/manager/layout.tsx',
  '/app/(protected)/faculty/layout.tsx'
];

const missingPages = [];

layouts.forEach(layoutPath => {
  if (!fs.existsSync(layoutPath)) return;
  const content = fs.readFileSync(layoutPath, 'utf8');
  const regex = /href:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/')) {
      const pagePath = path.join('/app', href, 'page.tsx');
      if (!fs.existsSync(pagePath)) {
        missingPages.push({ href, pagePath });
      }
    }
  }
});

missingPages.forEach(({ href, pagePath }) => {
  const dir = path.dirname(pagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const title = href.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const content = `export default function ${title.replace(/\s/g, '')}Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">${title}</h2>
          <p className="text-sm text-gray-500">This page is under construction.</p>
        </div>
      </div>
      <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We are working hard to bring you this feature. Check back later!
        </p>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(pagePath, content);
  console.log(`Created placeholder for ${href}`);
});
