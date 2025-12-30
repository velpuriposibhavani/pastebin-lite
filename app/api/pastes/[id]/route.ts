import { NextResponse } from 'next/server';
import { redis, getCurrentTime } from "@/lib/redis"; 

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const paste: any = await redis.hgetall(`paste:${params.id}`);
  if (!paste) return NextResponse.json({ error: "Not Found" }, { status: 404 });

  const now = getCurrentTime(req.headers);
  if (paste.expires_at && now > paste.expires_at) return NextResponse.json({ error: "Not Found" }, { status: 404 });

  if (paste.max_views !== null) {
    const remaining = await redis.hincrby(`paste:${params.id}`, "remaining_views", -1);
    if (remaining < 0) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    paste.remaining_views = remaining;
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
  });
}