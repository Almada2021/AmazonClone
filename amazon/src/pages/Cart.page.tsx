import HeaderComponent from '../features/products/components/Header.component';
import PaymentGateway from '../features/products/components/Payment.component';
import ProductComponent from '../features/products/components/Product.component';
import { useAppSelector } from '../hooks/redux/hooks';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
const ContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.secondary.contrastText,
  minHeight: "300px",
  maxWidth: "300px",
}));
const CartPage = () => {
  const { cart, products } = useAppSelector((state) => state.product);
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );
  return (
    <div>
      <HeaderComponent />
      {/* <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '48px',
        }}
      >
        {products.length > 0 &&
          products.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
      </div> */}
      <ContainerBox style={{ width: '80%', margin: 'auto' }}>
        <hr style={{ marginTop: '16px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '20px',
          }}
        >
          <span style={{ marginRight: '16px' }}>
            Subtotal {totalQty} items:
          </span>
          <span style={{ marginBottom: '48px', fontWeight: 500 }}>
            $ {totalPrice.toFixed(2)}
          </span>
        </div>
        {totalQty > 0 && <PaymentGateway />}
      </ContainerBox>
    </div>
  );
};

export default CartPage;
