import type { RouterOutputs } from "@/utils/api";
import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/utils/api";

function PostCard(props: { post: RouterOutputs["post"]["all"][number] }) {
  const { post } = props;

  const utils = api.useUtils();

  const { mutate: deletePost } = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate(),
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED")
        Alert.alert("Error", "Only the author can delete their post");
    },
  });

  return (
    <Card className="flex flex-row rounded-lg bg-muted p-4">
      <CardContent className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable>
            <Image
              className="mr-2 h-10 w-10 self-center rounded-full"
              source={post.author.image ?? ""}
            />
            <View>
              <Text className="text-xl font-semibold text-emerald-400">
                {post.title}
              </Text>
              <Text className="mt-2 text-foreground">{post.content}</Text>
            </View>
          </Pressable>
        </Link>
      </CardContent>
      <CardFooter>
        <Button onPress={() => deletePost(post.id)} variant="link">
          <Text>Delete</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CreatePost() {
  const utils = api.useUtils();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { mutate: createPost, error } = api.post.create.useMutation({
    onSuccess: async () => {
      setTitle("");
      setContent("");
      Keyboard.dismiss();
      await utils.post.all.invalidate();
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED")
        Alert.alert("Error", "You must be logged in to create a post");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={150}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <View className="mt-4 justify-around">
          <TextInput
            className="mb-2 rounded bg-background p-2 text-zinc-200"
            placeholderTextColor="#A1A1A9" // zinc-400
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          {error?.data?.zodError?.fieldErrors.title && (
            <Text className="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.title}
            </Text>
          )}
          <TextInput
            className="mb-2 rounded bg-background p-2 text-zinc-200"
            placeholderTextColor="#A1A1A9" // zinc-400
            value={content}
            onChangeText={setContent}
            placeholder="Content"
          />
          {error?.data?.zodError?.fieldErrors.content && (
            <Text className="mb-2 text-destructive">
              {error.data.zodError.fieldErrors.content}
            </Text>
          )}
          <Pressable
            className="rounded bg-emerald-400 p-2"
            onPress={() => {
              createPost({
                title,
                content,
              });
            }}
          >
            <Text className="font-semibold text-foreground">Publish post</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default function HomeScreen() {
  const utils = api.useUtils();

  const postQuery = api.post.all.useQuery();

  return (
    <SafeAreaView className="bg-background">
      <View className="h-full w-full bg-background p-4">
        <Button
          className="my-4"
          onPress={() => void utils.post.all.invalidate()}
        >
          <Text className="font-semibold text-foreground">Refresh posts</Text>
        </Button>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => <PostCard post={p.item} />}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
}
