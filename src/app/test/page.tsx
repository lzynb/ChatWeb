export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎉 Vercel部署成功！
        </h1>
        <p className="text-gray-600 mb-4">
          如果你能看到这个页面，说明Vercel部署正常工作。
        </p>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-green-800">
            ✅ 环境变量配置正确<br/>
            ✅ Next.js应用正常运行<br/>
            ✅ API路由可以访问
          </p>
        </div>
        <a 
          href="/" 
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          返回主页
        </a>
      </div>
    </div>
  );
}
