import { ITicket } from '@/models/Ticket';
import Ticket from '@/models/Ticket';
import { FilterQuery } from 'mongoose';

export class TicketService {
  static async createTicket(ticketData: Partial<ITicket>): Promise<ITicket> {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }

  static async getTickets(query: FilterQuery<ITicket> = {}): Promise<ITicket[]> {
    return await Ticket.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
  }

  static async getTicketById(id: string): Promise<ITicket | null> {
    return await Ticket.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');
  }

  static async updateTicket(id: string, updateData: Partial<ITicket>): Promise<ITicket | null> {
    return await Ticket.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('createdBy', 'name email')
     .populate('assignedTo', 'name email');
  }

  static async getTicketsByUser(userId: string): Promise<ITicket[]> {
    return await Ticket.find({ createdBy: userId })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
  }

  static async getTicketsByStatus(status: string): Promise<ITicket[]> {
    return await Ticket.find({ status })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
  }

  static async getTicketMetrics() {
    const [open, inProgress, resolved] = await Promise.all([
      Ticket.countDocuments({ status: 'OPEN' }),
      Ticket.countDocuments({ status: 'IN_PROGRESS' }),
      Ticket.countDocuments({ status: 'RESOLVED' })
    ]);

    return {
      open,
      inProgress,
      resolved,
      total: open + inProgress + resolved
    };
  }
}