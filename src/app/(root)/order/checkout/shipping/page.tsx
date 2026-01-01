import AddressForm from '@/components/shared/address/AddressForm'
import { getUserById } from '@/lib/actions/user.actions';
import { ShippingAddress } from '@/types';

const defaultAddress: ShippingAddress = {
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
  };

const ShipppingPage = async () => {
  // 检查是否登录。如果没有 userId，重定向到登录页
  // const session = await auth();
  // if (!session?.user?.id) {
  //   redirect('/signin?callbackUrl=/order/checkout');
  // }
  const user = await getUserById();
  const address = (user.address as ShippingAddress) || defaultAddress;
  return <div><AddressForm address={address}/></div>;
};

export default ShipppingPage;
