import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { v4 as uuidv4 } from 'uuid';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(private readonly chatGateway: ChatGateway) {}
  private chats:Chat[]=[]
  create(createChatDto: CreateChatDto) {
    const newChat = new Chat()
    newChat.id=uuidv4()
    newChat.message=createChatDto.message
    newChat.createdAt = new Date()
    this.chats.push(newChat)
    this.chatGateway.created(newChat)
    return newChat
  }

  findAll() {
    return this.chats
  }

  findOne(id: string) {
    return this.chats.find(chat=>chat.id==id)
  }

  update(id: string, updateChatDto: UpdateChatDto) {
    const oldChat = this.findOne(id)
    const updatedChat = Object.assign(oldChat,updateChatDto) as Chat
    const index = this.chats.findIndex(chat=>chat.id==id)
    this.chats[index]=updatedChat
    this.chatGateway.updated(updatedChat)
    return updatedChat
  }

  remove(id: string) {
    const oldChat = this.findOne(id)
    this.chats = this.chats.filter(chat=>chat.id!==id)
    this.chatGateway.removed(oldChat)
    return oldChat
  }
}
