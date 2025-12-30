import { redis } from '@/lib/redis';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const PasteSchema = z.object({
  content: z.string().min(1), // Content required and non-empty
  ttl_seconds: z.number().int().min(1).optional(), // Optional, integer >= 1
  max_views: z.number().int().min(1).optional(), // Optional, integer >= 1
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = PasteSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 }); // Invalid input 4xx
    }

    const id = nanoid(10);
    const { content, ttl_seconds, max_views } = result.data;
    
    // Redis lo store cheyadam
    await redis.hset(`paste:${id}`, {
      content,
      max_views: max_views ?? null,
      remaining_views: max_views ?? null,
      expires_at: ttl_seconds ? Date.now() + (ttl_seconds * 1000) : null,
    });
    
    const host = req.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    
    return NextResponse.json({
      id,
      url: `${protocol}://${host}/p/${id}` // Correct URL format
    }, { status: 201 });
  } catch (e) {
    console.error(e); // Terminal lo error chudataniki
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}