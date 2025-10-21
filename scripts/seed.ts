import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../src/models/User';
import Ticket from '../src/models/Ticket';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/abertura_tickets_devsolutions';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await User.deleteMany({});
    await Ticket.deleteMany({});

    const users = await User.insertMany([
      { name: 'João da Silva', email: 'joao@inovatech.com', password: '123456', role: 'EMPLOYEE' },
      { name: 'Maria Souza', email: 'maria@inovatech.com', password: '123456', role: 'TECHNICIAN' }
    ]);

    const [joao, maria] = users;

    await Ticket.insertMany([
      { title: 'Problema no login', description: 'Não consigo acessar meu e-mail.', status: 'OPEN', priority: 'HIGH', createdBy: joao._id, assignedTo: maria._id },
      { title: 'Computador lento', description: 'Máquina demora a iniciar.', status: 'IN_PROGRESS', priority: 'MEDIUM', createdBy: joao._id },
    ]);

    console.log('Seed concluído com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro durante o seed:', err);
    process.exit(1);
  }
}

seed();
