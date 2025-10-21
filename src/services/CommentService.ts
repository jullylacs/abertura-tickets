import { IComment } from '@/models/Comment';
import Comment from '@/models/Comment';

export class CommentService {
  static async createComment(commentData: Partial<IComment>): Promise<IComment> {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  static async getCommentsByTicket(ticketId: string): Promise<IComment[]> {
    return await Comment.find({ ticket: ticketId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
  }

  static async deleteComment(id: string): Promise<boolean> {
    const result = await Comment.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}