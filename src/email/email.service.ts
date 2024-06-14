import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { User } from 'src/models/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tigo1515007@gmail.com', // replace with your email
        pass: 'qrio ljiy etzs crpx', // replace with your email password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: 'tigo1515007@gmail.com', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }
}
