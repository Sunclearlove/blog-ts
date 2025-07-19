// components/PostCard.tsx
import Link from 'next/link'
import { Post } from '@/types/post'
import CommentForm from '@/components/CommentForm'

export default function PostCard({ post }: { post: Post }) {
  console.log(post)
  return (
    <div className="border rounded p-4 mb-4">
      <Link href={`/post/${post.id}`} className="text-xl font-bold hover:underline">
        {post.title}
      </Link>
      <p className="text-gray-600 mt-2">{post.summary}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <Link key={tag} href={`/tag/${tag}`} className="text-sm text-blue-600 hover:underline">
            #{tag}
          </Link>
        ))}
      </div>
      <CommentForm postId={post.id} />
    </div>
  )
}
