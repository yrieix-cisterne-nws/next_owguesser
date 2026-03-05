import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const userexist = await query(
      'SELECT id FROM user WHERE email = ?',
      [email]
    );

    if (userexist && userexist.length > 0) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    await query(
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    const token = jwt.sign(
      { username, email },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token,
        user: { username, email }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}