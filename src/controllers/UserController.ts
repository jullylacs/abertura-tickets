import { NextResponse } from 'next/server';
import { UserService } from '@/services/UserService';

export async function createUser(req: Request) {
  try {
    const data = await req.json();
    const user = await UserService.createUser(data);
    // Remove password from response
    const { password, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function getTechnicians() {
  try {
    const technicians = await UserService.getTechnicians();
    // Remove passwords from response
    const techniciansWithoutPasswords = technicians.map(tech => {
      const { password, ...techWithoutPassword } = tech.toObject();
      return techWithoutPassword;
    });
    return NextResponse.json(techniciansWithoutPasswords);
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technicians' },
      { status: 500 }
    );
  }
}

export async function validateCredentials(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await UserService.findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const isValid = await UserService.validatePassword(user, password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error validating credentials:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}