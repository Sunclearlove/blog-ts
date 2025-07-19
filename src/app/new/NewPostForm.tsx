'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPostForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('') // 用英文逗号分隔输入字符串

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    const { error } = await supabase.from('posts').insert([{ title, summary, content, tags: tagArray }])
    if (!error) {
      router.push('/')
    } else {
      alert('发布失败')
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-6">新增文章</h1>
        <Link href={`/`} className="bg-green-400 text-white flex items-center justify-center h-10 text-center w-20 rounded">
          返回
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="摘要"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded h-40"
          placeholder="正文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="标签（用英文逗号分隔：vue,nextjs）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          发布
        </button>
      </form>
    </main>
  )
}
