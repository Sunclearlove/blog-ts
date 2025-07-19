export const revalidate = 60

export async function generateStaticParams() {
  return [{ tag: 'vue' }, { tag: 'nextjs' }]
}

// app/tag/[tag]/page.tsx
import { supabase } from '@/lib/supabase'

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: encodedTag } = await params
  const tag = decodeURIComponent(encodedTag) // ✅ 解码“东京”

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .contains('tags', [tag])

  console.log('解码后标签是：', tag)
  console.log('匹配到的文章：', posts)

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4"># {tag}</h1>
      {posts?.map(post => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <a href={`/post/${post.id}`}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </a>
          <p className="text-gray-600">{post.summary}</p>
          <p className="text-gray-600">{post.content}</p>
        </div>
      ))}
    </main>
  )
}
