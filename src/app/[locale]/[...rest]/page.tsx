import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import pageIcon from '@/app/favicon.ico';
 
export const metadata: Metadata = {
  title: "404 | Curly Braces Studios",
  description: "Not found",
  icons: { icon: pageIcon.src }
}

export default function CatchAllPage() {
  notFound();
}