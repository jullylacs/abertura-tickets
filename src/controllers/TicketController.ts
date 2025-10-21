import { NextResponse } from 'next/server';
import { TicketService } from '@/services/TicketService';

export async function createTicket(req: Request) {
  try {
    const data = await req.json();
    const ticket = await TicketService.createTicket(data);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}

export async function getTickets(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    
    let tickets;
    if (userId) {
      tickets = await TicketService.getTicketsByUser(userId);
    } else if (status) {
      tickets = await TicketService.getTicketsByStatus(status);
    } else {
      tickets = await TicketService.getTickets();
    }

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function updateTicket(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const ticket = await TicketService.updateTicket(params.id, data);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

export async function getTicketMetrics() {
  try {
    const metrics = await TicketService.getTicketMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching ticket metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket metrics' },
      { status: 500 }
    );
  }
}