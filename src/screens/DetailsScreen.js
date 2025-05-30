import React from "react";
import { ScrollView, StyleSheet, Linking, Image, View } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";

// Component màn hình chi tiết bài viết tin tức
const DetailsScreen = ({ route }) => {
  // Lấy dữ liệu bài viết từ tham số điều hướng
  //trích xuất thuộc tính article từ đối tượng route.params.(chứa giá trị của route.params.article)
  const { article } = route.params;

  // Phân rã (destructure) các thuộc tính từ object article
  const { title, description, content, urlToImage, url, publishedAt, source } =
    article;

  // Sử dụng theme từ react-native-paper để lấy màu sắc phù hợp với chủ đề ứng dụng
  const theme = useTheme();

  // Hàm định dạng ngày tháng thành tiếng Việt
  const formatDate = (dateString) => {
    // Các tùy chọn hiển thị ngày tháng
    const options = {
      year: "numeric", // Năm đầy đủ (vd: 2024)
      month: "long", // Tên tháng đầy đủ (vd: Tháng 12)
      day: "numeric", // Ngày trong tháng (vd: 25)
      hour: "2-digit", // Giờ 2 chữ số (vd: 14)
      minute: "2-digit", // Phút 2 chữ số (vd: 30)
    };
    // Chuyển đổi ngày thành định dạng tiếng Việt
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Hàm xử lý mở bài viết gốc trong trình duyệt
  const handleOpenArticle = async () => {
    try {
      // Sử dụng Linking để mở URL trong trình duyệt mặc định
      await Linking.openURL(url);
    } catch (error) {
      // Bắt lỗi nếu không thể mở URL
      console.error("Error opening URL:", error);
    }
  };

  return (
    // ScrollView cho phép cuộn nội dung khi vượt quá màn hình
    <ScrollView
      // Style container với màu nền từ theme
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      // Style cho nội dung bên trong ScrollView
      contentContainerStyle={styles.contentContainer} // padding sau nút read full article
    >
      {/* View có hiệu ứng animation fade in từ dưới lên */}
      <Animatable.View
        animation="fadeInUp" // Hiệu ứng xuất hiện từ dưới lên
        duration={800} // Thời gian animation 800ms
        useNativeDriver // Sử dụng native driver để tối ưu hiệu suất
        style={styles.animatableView}
      >
        {/* Hình ảnh bài viết */}
        <Image
          source={{
            // Sử dụng hình ảnh từ bài viết
            uri: urlToImage,
          }}
          style={styles.image} // Style cho hình ảnh
          resizeMode="cover" // Cách hiển thị hình: bao phủ toàn bộ khung
        />

        {/* Container chứa nội dung bài viết */}
        <View style={styles.cardContent}>
          {/* Tiêu đề bài viết */}
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>

          {/* Container chứa thông tin meta (nguồn và ngày) */}
          <View style={styles.metaContainer}>
            {/* Container hiển thị nguồn tin */}
            <View style={styles.sourceContainer}>
              {/* name là tên icon */}
              <Icon name="source" size={16} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.source}>
                {source?.name || "Unknown Source"}
              </Text>
            </View>

            {/* Container hiển thị ngày đăng */}
            <View style={styles.dateContainer}>
              <Icon name="access-time" size={16} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={styles.date}>
                {formatDate(publishedAt)}
              </Text>
            </View>
          </View>

          {/* Mô tả bài viết (chỉ hiển thị nếu có), với bodyLarge là cỡ chữ to */}
          {description && (
            <Text variant="bodyLarge" style={styles.description}>
              {description}
            </Text>
          )}

          {/* Nội dung bài viết (chỉ hiển thị nếu có) */}
          {content && (
            <Text variant="bodyMedium" style={styles.content}>
              {/* Cắt bỏ phần "[+xxx chars]" từ cuối nội dung */}
              {content.split("[")[0].replace(/\[\+\d+ chars\]/, "")}
            </Text>
          )}

          {/* Nút đọc bài viết đầy đủ */}
          <Button
            mode="contained" // Kiểu nút có nền màu
            onPress={handleOpenArticle} // Hàm xử lý khi nhấn nút
            style={styles.button} // Style cho nút
            labelStyle={styles.buttonLabel} // Style cho text trên nút
            icon="open-in-new" // Icon mở trong tab mới
          >
            Read full article
          </Button>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

// Định nghĩa các style cho component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian có sẵn theo cả chiều ngang và dọc
  },
  contentContainer: {
    paddingBottom: 24, // Padding dưới cùng để tránh bị che
  },
  animatableView: {
    flex: 1, // Chiếm toàn bộ không gian
  },
  image: {
    width: "100%", // Chiều rộng 100% màn hình
    height: 250, // Chiều cao cố định 250px
    borderBottomLeftRadius: 0, // Bo góc dưới trái = 0
    borderBottomRightRadius: 0, // Bo góc dưới phải = 0
  },
  cardContent: {
    paddingHorizontal: 20, // Padding trái phải 20px
    paddingTop: 16, // Padding trên 16px
  },
  title: {
    fontWeight: "700", // Độ đậm chữ: rất đậm
    marginBottom: 12, // Khoảng cách dưới 12px
    lineHeight: 32, // Chiều cao dòng 32px
    color: "#1a237e", // Màu xanh navy đậm
  },
  metaContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều 2 đầu
    marginBottom: 16, // Khoảng cách dưới 16px
  },
  sourceContainer: {
    flexDirection: "row", // Sắp xếp icon và text theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  dateContainer: {
    flexDirection: "row", // Sắp xếp icon và text theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  source: {
    marginLeft: 4, // Khoảng cách trái 4px (sau icon)
    color: "#5c6bc0", // Màu xanh nhạt
  },
  date: {
    marginLeft: 4, // Khoảng cách trái 4px (sau icon)
    color: "#78909c", // Màu xám nhạt
  },
  description: {
    lineHeight: 28, // Chiều cao dòng 28px (dễ đọc)
    color: "#263238", // Màu xám đậm
    marginBottom: 20, // Khoảng cách dưới 20px
    fontWeight: "500", // Độ đậm chữ: trung bình
  },
  content: {
    lineHeight: 26, // Chiều cao dòng 26px
    color: "#455a64", // Màu xám xanh đậm
    marginBottom: 24, // Khoảng cách dưới 24px
  },
  button: {
    marginTop: 8, // Khoảng cách trên 8px
    borderRadius: 8, // Bo góc 8px
    paddingVertical: 8, // Padding trên dưới 8px
    backgroundColor: "#ffab00", // Màu nền vàng cam

    // Hiệu ứng đổ bóng cho Android
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Độ lệch ngang của bóng
      height: 2, // Độ lệch dọc của bóng
    },
    shadowOpacity: 0.25, // Độ trong suốt của bóng
    shadowRadius: 3.84, // Độ mờ của bóng
    elevation: 5, // Độ nổi cho Android (tạo hiệu ứng nổi)
  },
  buttonLabel: {
    color: "#1a237e", // Màu chữ xanh navy đậm
    fontWeight: "600", // Độ đậm chữ: hơi đậm
    fontSize: 16, // Kích thước chữ 16px
  },
});

export default DetailsScreen;
