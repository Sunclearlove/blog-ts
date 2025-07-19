'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EditPostPage() {
  const params = useParams()
  const postId = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select('*').eq('id', postId).single()
      if (data) {
        setTitle(data.title)
        setSummary(data.summary)
        setContent(data.content)
      }
    }

    if (postId) fetchPost()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('posts')
      .update({ title, summary, content })
      .eq('id', postId)

    if (!error) {
      router.push(`/post/${postId}`)
    } else {
      alert('更新失败')
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">编辑文章</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          保存修改
        </button>
      </form>
    </main>
  )
}
