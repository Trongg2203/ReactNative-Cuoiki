import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Title } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines, searchNews } from "../services/api";
import { setupShakeListener } from "../utils/shake";

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [canShake, setCanShake] = useState(true);

  // Fetch top headlines
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await getTopHeadlines();
      setArticles(response.articles);
    } catch (error) {
      Alert.alert("Error", "Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      Alert.alert("Error", "Search query must be at least 2 characters long.");
      return;
    }
    try {
      setLoading(true);
      const response = await searchNews(query);
      setArticles(response.articles.length ? response.articles : []);
    } catch (error) {
      Alert.alert("Error", "No results found or search failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    setSearchQuery("");
    await fetchNews();
    setRefreshing(false);
  };

  // useEffect(() => {
  //   fetchNews();
  // }, []);

  // Setup shake listener for refresh
  useEffect(() => {
    fetchNews();
    const unsubscribe = setupShakeListener(() => {
      if (canShake) {
        setCanShake(false);
        handleRefresh();
        Alert.alert(
          "Shake Detected",
          "News refreshed!",
          [
            {
              text: "OK",
              onPress: () => setCanShake(true),
            },
          ],
          { cancelable: false }
        );
      }
    });
    return () => unsubscribe();
  }, [canShake]);

  // Render each article card with animation
  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="zoomIn"
      duration={600}
      delay={index * 100}
      useNativeDriver>
      <NewsCard
        article={item}
        onPress={() => navigation.navigate("Details", { article: item })}
      />
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="slideInDown" duration={800} useNativeDriver>
        <Title style={styles.header}>News Feed</Title>
        <TextInput
          mode="outlined"
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          style={styles.searchBar}
          theme={{ colors: { primary: "#0288d1" } }}
        />
      </Animatable.View>
      {loading ? (
        <ActivityIndicator size="large" color="#0288d1" style={styles.loader} />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Title style={styles.emptyText}>No articles found</Title>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    margin: 16,
    color: "#01579b",
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});

export default HomeScreen;
