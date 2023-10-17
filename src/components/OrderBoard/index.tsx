import { useState } from 'react';

import { IOrder } from '../../types/IOrder';
import { OrderModal } from '../OrderModal';

import { Container, OrdersContainer } from './styles';

interface IOrderBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
}

export function OrderBoard({ icon, title, orders }: IOrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  function handleOpenModal(order: IOrder) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  return (
    <Container>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              key={order._id}
              type="button"
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Container>
  );
}
