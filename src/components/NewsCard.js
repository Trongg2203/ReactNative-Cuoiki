import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const NewsCard = ({ article, onPress }) => {
  const { title, description, urlToImage, publishedAt } = article;

  // Format the publication date follow style MMM DD, YYYY
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{ uri: urlToImage || "https://via.placeholder.com/150x100" }}
          style={styles.image}
        />
        <Card.Content style={styles.content}>
          <Title numberOfLines={2} style={styles.title}>
            {title}
          </Title>
          {description && (
            <Paragraph numberOfLines={2} style={styles.description}>
              {description}
            </Paragraph>
          )}
          <Paragraph style={styles.date}>{formatDate(publishedAt)}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
  card: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
  },
  image: {
    width: 388,
    height: 200,
    borderRadius:10,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#01579b",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
// dung memo de dam bao toi uu component khi render vs data lớn
export default React.memo(NewsCard);
