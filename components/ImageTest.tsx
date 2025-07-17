import { images, offers } from "@/constants";
import { Image, ScrollView, Text, View } from "react-native";

export default function ImageTest() {
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Image Test</Text>

      {/* Test individual images */}
      <View className="mb-4">
        <Text className="text-lg mb-2">Arrow Right Icon:</Text>
        <Image
          source={images.arrowRight}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2">Burger One:</Text>
        <Image
          source={images.burgerOne}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>

      {/* Test offers data */}
      <Text className="text-lg mb-2">Offers:</Text>
      {offers.map((offer) => (
        <View
          key={offer.id}
          className="mb-4 p-4 border border-gray-300 rounded"
        >
          <Text className="text-base mb-2">{offer.title}</Text>
          <Image
            source={offer.image}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        </View>
      ))}
    </ScrollView>
  );
}
