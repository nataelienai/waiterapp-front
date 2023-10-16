import { IOrder } from '../../types/IOrder';
import { OrderBoard } from '../OrderBoard';

import { Container } from './styles';

const orders: IOrder[] = [
  {
    _id: '34738947982348923',
    table: '123',
    status: 'DONE',
    products: [
      {
        _id: '23489573289328',
        quantity: 3,
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '73298472389-quatro-queijos.png',
          price: 40,
        },
      },
      {
        _id: '4932483209840923',
        quantity: 3,
        product: {
          name: 'Coca cola',
          imagePath: '749382749823-coca-cola.png',
          price: 7,
        },
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrderBoard icon="🕑" title="Fila de espera" orders={orders} />
      <OrderBoard icon="👩‍🍳" title="Em produção" orders={[]} />
      <OrderBoard icon="✅" title="Pronto" orders={[]} />
    </Container>
  );
}
