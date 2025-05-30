import React from "react";
import { ScrollView, StyleSheet, Linking, Image, View } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";

const DetailsScreen = ({ route }) => {
  const { article } = route.params;
  const { title, description, content, urlToImage, url, publishedAt, source } =
    article;
  const theme = useTheme();

  // Format the publication date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const handleOpenArticle = async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        useNativeDriver
        style={styles.animatableView}
      >
        {/* Hình ảnh bài viết */}
        <Image
          source={{
            uri:
              urlToImage || "https://via.placeholder.com/800x450?text=No+Image",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          {/* Tiêu đề và nguồn */}
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.sourceContainer}>
              <Icon name="source" size={16} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.source}>
                {source?.name || "Unknown Source"}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Icon name="access-time" size={16} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.date}>
                {formatDate(publishedAt)}
              </Text>
            </View>
          </View>

          {/* Mô tả và nội dung */}
          {description && (
            <Text variant="bodyLarge" style={styles.description}>
              {description}
            </Text>
          )}

          {content && (
            <Text variant="bodyMedium" style={styles.content}>
              {content.split("[")[0].replace(/\[\+\d+ chars\]/, "")}
            </Text>
          )}

          {/* Nút đọc bài viết */}
          <Button
            mode="contained"
            onPress={handleOpenArticle}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon="open-in-new"
          >
            Read full article
          </Button>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  animatableView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 32,
    color: "#1a237e",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  source: {
    marginLeft: 4,
    color: "#5c6bc0",
  },
  date: {
    marginLeft: 4,
    color: "#78909c",
  },
  description: {
    lineHeight: 28,
    color: "#263238",
    marginBottom: 20,
    fontWeight: "500",
  },
  content: {
    lineHeight: 26,
    color: "#455a64",
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: "#ffab00",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLabel: {
    color: "#1a237e",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DetailsScreen;
