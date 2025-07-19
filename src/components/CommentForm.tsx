// components/CommentForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CommentForm({ postId }: { postId: string }) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!author || !content) return alert('请填写完整信息')

    const { error } = await supabase.from('comments').insert([
      {
        post_id: postId,
        author,
        content,
      },
    ])

    if (error) {
      alert('提交失败')
    } else {
      setAuthor('')
      setContent('')
      router.refresh() // ✅ 自动刷新评论列表
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="你的名字"
        className="w-full border p-2 rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="你的评论"
        className="w-full border p-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        发表评论
      </button>
    </form>
  )
}
