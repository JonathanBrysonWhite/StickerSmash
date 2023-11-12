import { StyleSheet, View, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
window._frameTimestamp = null //fixes bug in web view where app crashes on emoji selection
const AnimatedImage = Animated.createAnimatedComponent(Image);
export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  });
  
  const panGesture = Gesture.Pan()
  .onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  });

  const tapGesture = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2
    }
  })


  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={tapGesture}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 120,
    width:120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30
  }
});