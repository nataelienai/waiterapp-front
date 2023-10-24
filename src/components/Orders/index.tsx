import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { IOrder } from '../../types/IOrder';
import { api } from '../../utils/api';
import { OrderBoard } from '../OrderBoard';

import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    api
      .get('/orders')
      .then((response) => {
        setOrders(response.data as IOrder[]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    function handleNewOrder(order: IOrder) {
      setOrders((prevState) => prevState.concat(order));
    }

    socket.on('orders@new', handleNewOrder);

    return () => {
      socket.removeListener('orders@new', handleNewOrder);
    };
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter(
    (order) => order.status === 'IN_PRODUCTION',
  );
  const done = orders.filter((order) => order.status === 'DONE');

  function handleChangeOrderStatus(orderId: string, status: IOrder['status']) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order,
      ),
    );
  }

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId),
    );
  }

  return (
    <Container>
      <OrderBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onChangeOrderStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
      />

      <OrderBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={inProduction}
        onChangeOrderStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
      />

      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onChangeOrderStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  );
}
