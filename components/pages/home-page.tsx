import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartButton from "../cartButton";

interface OfferType {
  id: number;
  title: string;
  image: any;
  color: string;
}

export default function HomePage() {
  function isEven(index: number) {
    return index % 2 === 0 ? true : false;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        renderItem={({ item, index }: { item: OfferType; index: number }) => {
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven(index) ? "flex-row-reverse" : "flex-row"
                )}
                android_ripple={{ color: "#fffff22" }}
                style={{ backgroundColor: item.color }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="w-48 h-full flex items-center justify-center">
                      <Image
                        source={item.image}
                        style={{ width: 120, height: 120 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven(index) ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">Deliver To</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                <Image
                  source={images.arrowDown}
                  style={{ width: 12, height: 12 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
