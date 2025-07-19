import { supabase } from '@/lib/supabase'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '我的博客首页',
  description: '记录学习与成长的技术博客'
}

export default async function HomePage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-6">我的博客</h1>
        <Link href={`/new`} className="bg-green-400 text-white flex items-center justify-center h-10 text-center w-20 rounded">
          发布
        </Link>
      </div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}
