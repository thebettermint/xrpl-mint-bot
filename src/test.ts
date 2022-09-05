import { WS } from './bot/monitor/ws';
import { WebSocket } from 'ws';

export const test = async () => {
  while (true) {
    await new Promise((resolve) => {
      let ws = new WS();
      setTimeout(() => {
        console.log(ws['peerSockets']);
        resolve('');
      }, 5000);
    });
  }
};

export const ws1 = async () => {
  const ws = new WebSocket('wss://thebettermint.dev/ws');

  ws.onopen = () => {
    console.log('WS: server connected');
    console.log('sending message');
    ws.send(
      JSON.stringify({
        type: 'subscribe',
      })
    );
  };

  ws.onmessage = async (e: any) => {
    let response = JSON.parse(e.data);
    console.log('message received', response);

    if (response.type == 'success') return;
    if (response.type == 'ping')
      return ws.send(JSON.stringify({ type: 'pong' }));
    console.log(response);

    return;
  };

  ws.onclose = () => console.log('WS: Disconnected');
  ws.onerror = (e) => console.error('WS: Error', e);
};

ws1();