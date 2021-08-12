import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Chat } from './entities/chat.entity';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

/**
 * namespace will help to code split, This will be usefull to organize each gateway with its own resource
 * This can be accessiable in the client side as follows,
 * Eg: this.chatSocket = io('http://localhost:8080/chats', {
 *          transports: ['websocket'],
 *         });
 * listening for event as follows
 * Eg: this.chatSocket.on("created",(payload)=>{})
 * For more check client/index.html
 */
@WebSocketGateway({ namespace: '/chats' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() 
  private wsServer: Server;
  private logger: Logger = new Logger('ChatGateway');

  created(chat: Chat) {
    return this.wsServer.emit('created', chat);
  }

  updated(chat: Chat) {
    return this.wsServer.emit('updated', chat);
  }


  removed(chat: Chat) {
    return this.wsServer.emit('removed', chat);
  }

  afterInit(server: Server) {
    this.logger.log('Init ChatGateway');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
