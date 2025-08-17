'use client';

import { useState } from 'react';
import { Chat } from '@/types/chat';

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export default function ChatList({ chats, activeChatId, onChatSelect, onNewChat, onDeleteChat }: ChatListProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    
    // 如果只有一个对话，不允许删除
    if (chats.length <= 1) {
      alert('至少需要保留一个对话');
      return;
    }
    
    // 确认删除
    if (confirm('确定要删除这个对话吗？删除后无法恢复。')) {
      onDeleteChat(chatId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-r border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">新建对话</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2">
        {chats.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">暂无对话</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">点击上方按钮开始新对话</p>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`relative group cursor-pointer rounded-xl p-3 transition-all duration-200 ${
                  chat.id === activeChatId
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
                onClick={() => onChatSelect(chat.id)}
                onMouseEnter={() => setIsHovered(chat.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${
                      chat.id === activeChatId ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}>
                      {chat.title}
                    </h3>
                    <p className={`text-xs truncate mt-1 ${
                      chat.id === activeChatId ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {chat.lastMessage}
                    </p>
                    <p className={`text-xs mt-1 ${
                      chat.id === activeChatId ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {chat.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* Delete button on hover */}
                {isHovered === chat.id && (
                  <button
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    title="删除对话"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 