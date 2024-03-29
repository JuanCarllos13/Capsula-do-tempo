import Icon from "@expo/vector-icons/Feather";
import * as SecureStore from "expo-secure-store";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";
import { api } from "../src/service/api";

dayjs.locale(ptBR);

interface Memory {
  coverUrl: string;
  excerpt: string;
  createdAt: string;
  id: string;
}

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    router.push("/index");
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(response.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <View className="flex-1" style={{ paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10 pb-20">
        <FlatList
          data={memories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View key={item.id} className="space-y-4">
                <View className="flex-row items-center gap-2">
                  <View className="h-px w-5 bg-gray-50" />
                  <Text className="font-body text-sm text-gray-100">
                    {dayjs(item.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                  </Text>
                </View>
                <View className="space-y-4 px-8">
                  <Image
                    source={{
                      uri: item.coverUrl!,
                    }}
                    className="aspect-video w-full rounded-lg"
                    alt="Image"
                  />
                  <Text className="font-body text-base leading-relaxed text-gray-100">
                    {item.excerpt}
                  </Text>
                  <Link href="/memories/id" asChild>
                    <TouchableOpacity className="mb-5 flex-row items-center gap-2">
                      <Text className="font-body text-sm text-gray-200">
                        Ler mais
                      </Text>
                      <Icon name="arrow-right" size={16} color="#9e9ea0" />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
