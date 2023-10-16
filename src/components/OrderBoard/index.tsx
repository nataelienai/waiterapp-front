import { IOrder } from '../../types/IOrder';

import { Container, OrdersContainer } from './styles';

interface IOrderBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
}

export function OrderBoard({ icon, title, orders }: IOrderBoardProps) {
  return (
    <Container>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button key={order._id} type="button">
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Container>
  );
}
