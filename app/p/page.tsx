import { redis } from "@/lib/redis"
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Page({ params }: { params: { id: string } }) {
  const paste: any = await redis.hgetall(`paste:${params.id}`);
  if (!paste) notFound();

  const now = getCurrentTime(headers());
  if (paste.expires_at && now > paste.expires_at) notFound();

  if (paste.max_views !== null) {
    const remaining = await redis.hincrby(`paste:${params.id}`, "remaining_views", -1);
    if (remaining < 0) notFound();
  }

  return (
    <div className="p-10 font-sans">
      <pre className="p-4 bg-gray-100 rounded border whitespace-pre-wrap shadow-sm">
        {paste.content}
      </pre>
    </div>
  );
}