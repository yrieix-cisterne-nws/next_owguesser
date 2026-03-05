import { query } from '@/lib/db'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request) {
    try {
        const authHeader = request.headers.get('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }
        const token = authHeader.split(' ')[1]
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
        }
        const scores = await query(
            'SELECT score, difficulty, created_at FROM score WHERE user_id = ? ORDER BY created_at DESC',
            [decoded.id]
        )
        return NextResponse.json(scores, { status: 200 })
    } catch (error) {
        console.error('Error fetching scores:', error)
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}