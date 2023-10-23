import { useState } from 'react';
import { toast } from 'react-toastify';

import { IOrder } from '../../types/IOrder';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';

import { Container, OrdersContainer } from './styles';

interface IOrderBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
  onChangeOrderStatus: (orderId: string, status: IOrder['status']) => void;
  onCancelOrder: (orderId: string) => void;
}

export function OrderBoard({
  icon,
  title,
  orders,
  onChangeOrderStatus,
  onCancelOrder,
}: IOrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: IOrder) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status =
      selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    const message =
      status === 'IN_PRODUCTION'
        ? `O pedido da mesa ${selectedOrder?.table} foi iniciado!`
        : `O pedido da mesa ${selectedOrder?.table} está pronto!`;

    toast.success(message);

    setIsLoading(false);
    setIsModalVisible(false);
    onChangeOrderStatus(selectedOrder!._id, status);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);

    setIsLoading(false);
    setIsModalVisible(false);
    onCancelOrder(selectedOrder!._id);
  }

  return (
    <Container>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
        onClose={handleCloseModal}
        onChangeOrderStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
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
