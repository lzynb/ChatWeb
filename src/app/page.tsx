'use client';

import { useState, useEffect } from 'react';
import ChatList from '@/components/ChatList';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import { Message, Chat, ChatMessage } from '@/types/chat';

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 初始化第一个对话
  useEffect(() => {
    if (chats.length === 0) {
      const initialChat: Chat = {
        id: '1',
        title: '新对话',
        lastMessage: '你好！我是基于DeepSeek的AI助手，有什么可以帮助你的吗？',
        timestamp: new Date(),
        messages: [
          {
            id: '1',
            content: '你好！我是基于DeepSeek的AI助手，有什么可以帮助你的吗？',
            type: 'ai',
            timestamp: new Date()
          }
        ]
      };
      setChats([initialChat]);
      setActiveChatId('1');
    }
  }, []);

  const getActiveChat = () => {
    return chats.find(chat => chat.id === activeChatId);
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updates } : chat
    ));
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: '新对话',
      lastMessage: '开始新的对话...',
      timestamp: new Date(),
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setInputValue('');
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setInputValue('');
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => {
      const newChats = prev.filter(chat => chat.id !== chatId);
      
      // 如果删除的是当前活跃的对话，自动切换到其他对话
      if (chatId === activeChatId) {
        if (newChats.length > 0) {
          // 切换到第一个对话
          setActiveChatId(newChats[0].id);
        } else {
          // 如果没有对话了，创建一个新的
          const newChat: Chat = {
            id: Date.now().toString(),
            title: '新对话',
            lastMessage: '开始新的对话...',
            timestamp: new Date(),
            messages: []
          };
          setActiveChatId(newChat.id);
          return [newChat];
        }
      }
      
      return newChats;
    });
    
    setInputValue('');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !activeChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    };

    // 更新当前对话的消息
    const activeChat = getActiveChat();
    if (!activeChat) return;

    const updatedMessages = [...activeChat.messages, userMessage];
    updateChat(activeChatId, {
      messages: updatedMessages,
      lastMessage: inputValue,
      timestamp: new Date()
    });

    setInputValue('');
    setIsLoading(true);

    try {
      // 构建多轮对话的消息历史
      const chatMessages: ChatMessage[] = updatedMessages
        .filter(msg => msg.type === 'user' || msg.type === 'ai')
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

      // 调用DeepSeek API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // 添加AI响应
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        type: 'ai',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiMessage];
      updateChat(activeChatId, {
        messages: finalMessages,
        lastMessage: data.content,
        timestamp: new Date()
      });

      // 更新对话标题（如果是第一条用户消息）
      if (updatedMessages.length === 1) {
        const title = inputValue.length > 20 ? inputValue.substring(0, 20) + '...' : inputValue;
        updateChat(activeChatId, { title });
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // 显示错误消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '抱歉，我遇到了一些问题。请稍后再试，或者检查网络连接。',
        type: 'ai',
        timestamp: new Date()
      };
      
      const activeChat = getActiveChat();
      if (activeChat) {
        const finalMessages = [...activeChat.messages, errorMessage];
        updateChat(activeChatId, {
          messages: finalMessages,
          lastMessage: '抱歉，我遇到了一些问题。请稍后再试，或者检查网络连接。',
          timestamp: new Date()
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const activeChat = getActiveChat();

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 flex-shrink-0 h-full overflow-hidden">
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onChatSelect={handleChatSelect}
          onNewChat={createNewChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  DeepSeek AI Assistant
                </h1>
                {activeChat && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activeChat.title}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">在线</span>
            </div>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeChat ? (
            <>
              {/* Messages Container - 固定高度，内部滚动 */}
              <div className="flex-1 overflow-hidden m-4 mb-2">
                <div className="h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden">
                  <ChatMessages 
                    messages={activeChat.messages} 
                    isLoading={isLoading} 
                  />
                </div>
              </div>

              {/* Input - 固定在底部 */}
              <div className="flex-shrink-0 mx-4 mb-4">
                <ChatInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  选择或创建对话
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  从左侧选择一个对话，或创建新的对话开始聊天
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
