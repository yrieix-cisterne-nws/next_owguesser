import { query } from '@/lib/db'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request) {
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

        const { score, difficulty } = await request.json()

        if (typeof score !== 'number' || score < 0) {
            return NextResponse.json({ message: 'Invalid score' }, { status: 400 })
        }

        if (!difficulty) {
            return NextResponse.json({ message: 'Difficulty is required' }, { status: 400 })
        }

        const result = await query(
            'INSERT INTO score (user_id, score, difficulty) VALUES (?, ?, ?)',
            [decoded.id, score, difficulty]
        )

        return NextResponse.json({ message: 'Score saved successfully' }, { status: 201 })
    } catch (error) {
        console.error('Error saving score:', error)
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}