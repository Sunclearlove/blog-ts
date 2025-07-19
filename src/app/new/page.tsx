// app/new/page.tsx
import { Metadata } from 'next'
import NewPostForm from './NewPostForm'

export const metadata: Metadata = {
  title: '写新文章',
  description: '撰写你的新博客内容'
}

export default function NewPage() {
  return <NewPostForm />
}
