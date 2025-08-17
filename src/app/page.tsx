'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }]
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.content);
      } else {
        setResponse('API调用失败，请检查环境变量配置');
      }
    } catch (error) {
      setResponse('网络错误：' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🤖 AI聊天测试页面
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">部署状态检查</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              ✅ Next.js应用正常运行
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              ✅ 页面路由正常工作
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
              🔄 测试API连接...
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API测试</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入消息：
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入测试消息..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '发送中...' : '发送消息'}
            </button>
          </form>

          {response && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">AI响应：</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/test" 
            className="text-blue-500 hover:text-blue-600 underline"
          >
            查看详细测试页面
          </a>
        </div>
      </div>
    </div>
  );
}
