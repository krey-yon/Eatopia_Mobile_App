import { images } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CartButton() {
  const { getTotalItems } = useCartStore();
  const totalitems = getTotalItems();
  return (
    <TouchableOpacity className="cart-btn">
      <Image
        source={images.bag}
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
      />

      <View className="cart-badge">
        <Text className="small-bold text-white">{totalitems}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CartButton;
