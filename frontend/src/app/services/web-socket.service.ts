// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { StompConfig } from './../../../node_modules/@stomp/stompjs/esm6/stomp-config';
// import { StompService } from './../../../node_modules/@stomp/ng2-stompjs/esm2015/src/app/compatibility/stomp.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private stompService:StompService;
//   private orderStatusSubject = new Subject<any>();
  
//   constructor() {
//     const stompConfig: StompConfig = {
//       brokerURL: 'ws://localhost:8082/ws',
//       connectHeaders: {},
//       heartbeatIncoming: 0,
//       heartbeatOutgoing: 20000,
//       reconnectDelay: 5000,
//     };
//     this.stompService = new StompService(stompConfig);
//     this.stompService.subscribe('/topic/order-status').subscribe((message:any) => {
//       const orderStatus = JSON.parse(message.body);
//       this.orderStatusSubject.next(orderStatus);
//     });

//   }
  
//   getOrderStatusUpdates() {
//     return this.orderStatusSubject.asObservable();
//   }
// }


