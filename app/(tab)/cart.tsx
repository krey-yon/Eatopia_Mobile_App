import CartItem from "@/components/cartItem";
import CustomButton from "@/components/customButton";
import CustomHeader from "@/components/customHeader";
import { images } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { PaymentInfoStripeProps } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
      {label}
    </Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
      {value}
    </Text>
  </View>
);

export default function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20 px-8">
            <Image
              source={images.illustration}
              className="w-64 h-64 mb-8"
              resizeMode="contain"
            />
            <Text className="text-2xl font-quicksand-bold text-dark-100 mb-3 text-center">
              Your cart is empty
            </Text>
            <Text className="text-base font-quicksand-regular text-gray-500 mb-8 text-center leading-6">
              Looks like you haven&apos;t added anything to your cart yet. Start
              browsing our delicious menu!
            </Text>
            <CustomButton
              title="Browse Menu"
              style="w-4/5"
              onPress={() => {
                router.push("/(tab)/search")
              }}
            />
          </View>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5 mt-5">
              <View className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm shadow-dark-100/5">
                <Text className="text-xl font-quicksand-bold text-dark-100 mb-6">
                  Payment Summary
                </Text>

                <PaymentInfoStripe
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`- $0.50`}
                  valueStyle="!text-green-600"
                />
                <View className="border-t border-gray-200 my-4" />
                <PaymentInfoStripe
                  label={`Total Amount`}
                  value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                  labelStyle="text-lg font-quicksand-bold !text-dark-100"
                  valueStyle="text-lg font-quicksand-bold !text-primary"
                />
              </View>

              <CustomButton
                title="Proceed to Checkout"
                style="bg-primary shadow-lg shadow-primary/20"
                onPress={() => {
                  console.log("Proceed to checkout");
                }}
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
