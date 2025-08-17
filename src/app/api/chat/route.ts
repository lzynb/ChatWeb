import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || "sk-80f1b61f68c04bd99c44764064b1b0fe",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // 验证消息格式
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // 验证API密钥
    if (!process.env.DEEPSEEK_API_KEY) {
      console.warn('DEEPSEEK_API_KEY not found in environment variables');
    }

    // 调用DeepSeek API
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    // 返回AI响应
    return NextResponse.json({
      content: response.choices[0].message.content,
      role: response.choices[0].message.role,
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    
    // 返回友好的错误信息
    return NextResponse.json(
      { 
        error: '抱歉，AI服务暂时不可用，请稍后再试。',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 