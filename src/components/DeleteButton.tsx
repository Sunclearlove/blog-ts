'use client'

interface DeleteButtonProps {
  postId: string
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  return (
    <form action={`/api/posts/delete?id=${postId}`} method="POST">
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={(e) => {
          if (!confirm('确定删除这篇文章吗？')) e.preventDefault()
        }}
      >
        删除
      </button>
    </form>
  )
}
