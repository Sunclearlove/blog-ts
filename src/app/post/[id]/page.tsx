// app/post/[id]/page.tsx
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css' // 或其他样式

import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export const revalidate = 60 // 每 60 秒重新生成页面


// 放在文件顶层
export async function generateStaticParams() {
  const { data: posts } = await supabase.from('posts').select('id')
  return posts?.map((post) => ({ id: post.id })) || []
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('title, summary, tags')
    .eq('id', id)
    .single()

  return {
    title: post?.title || '文章详情',
    description: post?.summary || '内容概览'
  }
}


export default async function PostDetailPage({ params }: Props) {
  const { id } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', id)
    .order('created_at', { ascending: false })

  if (!post) {
    return <div className="text-center py-20">文章不存在</div>
  }

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(post.created_at).toLocaleString()}</p>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {post.content}
      </ReactMarkdown>

      <h3 className="text-lg font-semibold mt-8">评论</h3>
      <ul className="mt-4 space-y-4">
        {comments?.map(comment => (
          <li key={comment.id} className="border p-4 rounded">
            <p className="text-sm text-gray-600">{new Date(comment.created_at).toLocaleString()}</p>
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
      
      <div className="flex gap-4 mt-4">
        <Link
          href={`/edit/${post.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          编辑
        </Link>
        <DeleteButton postId={post.id} />
      </div>
    </main>
  )
}
