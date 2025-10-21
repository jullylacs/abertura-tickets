import { NextResponse } from 'next/server';
import { CommentService } from '@/services/CommentService';

export async function createComment(req: Request) {
  try {
    const data = await req.json();
    const comment = await CommentService.createComment(data);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

export async function getTicketComments(req: Request, { params }: { params: { ticketId: string } }) {
  try {
    const comments = await CommentService.getCommentsByTicket(params.ticketId);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function deleteComment(req: Request, { params }: { params: { id: string } }) {
  try {
    const success = await CommentService.deleteComment(params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}