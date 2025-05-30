import { Accelerometer } from "expo-sensors";

export const setupShakeListener = (onShake) => {
  let lastUpdate = 0;
  let lastX, lastY, lastZ;

  const subscription = Accelerometer.addListener(({ x, y, z }) => {
    const currTime = Date.now();
    if (currTime - lastUpdate < 100) return;

    if (lastX !== undefined) {
      const diffX = Math.abs(x - lastX);
      const diffY = Math.abs(y - lastY);
      const diffZ = Math.abs(z - lastZ);

      // Detect shake if acceleration change exceeds threshold
      if (diffX + diffY + diffZ > 3) {
        lastUpdate = currTime;
        onShake();
      }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
    lastUpdate = currTime;
  });

  Accelerometer.setUpdateInterval(100);

  return () => subscription.remove();
};
