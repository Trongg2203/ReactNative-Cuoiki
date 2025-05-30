import { Accelerometer } from "expo-sensors";

export const setupShakeListener = (onShake) => {
  //  thời gian cập nhật cuối tránh bị lien tuc
  let lastUpdate = 0;
  // gia tốc truc xyz
  let lastX, lastY, lastZ;

  //  lắng nghe sự thay đổi của cảm biến 
  const subscription = Accelerometer.addListener(({ x, y, z }) => {
    // chỉ kiểm tra sau mỗi 100ms 
    const currTime = Date.now();
    if (currTime - lastUpdate < 100) return;

    // Tính độ thay đổi của gia tốc so với lần trước theo từng trục
    if (lastX !== undefined) {
      const diffX = Math.abs(x - lastX);
      const diffY = Math.abs(y - lastY);
      const diffZ = Math.abs(z - lastZ);

      // tổng độ thay đổi trên 3 trục vượt qua ngưỡng 3 -> goi hàm onShake();
      if (diffX + diffY + diffZ > 3) {
        lastUpdate = currTime;
        onShake();
      }
    }

    // cap nhat lai giá trị mỗi lần đo
    lastX = x;
    lastY = y;
    lastZ = z;
    lastUpdate = currTime;
  });

  // thoi gian cap nhat cảm biến
  Accelerometer.setUpdateInterval(100);
// huy khi roi khoi màn hình
  return () => subscription.remove();
};
