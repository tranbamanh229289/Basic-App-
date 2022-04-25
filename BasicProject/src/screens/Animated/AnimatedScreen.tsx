import React, {memo, useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import {HeaderBack} from '@/components/HeaderBack';
import {Animated, Easing} from 'react-native';
import {Colors} from '@/themes/Colors';
import {IMG_REACT_NATIVE} from '@/assets';

export const AnimatedScreen = memo(function AnimatedScreen() {
  const topMotion = useRef(new Animated.Value(0)).current;
  const leftMotion = useRef(new Animated.Value(0)).current;
  const spinMotion = useRef(new Animated.Value(0)).current;

  const moveUp = useCallback(() => {
    Animated.timing(topMotion, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [topMotion]);
  const moveDown = useCallback(() => {
    Animated.timing(topMotion, {
      toValue: 600,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [topMotion]);
  const moveLeft = useCallback(() => {
    Animated.timing(leftMotion, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [leftMotion]);
  const moveRight = useCallback(() => {
    Animated.timing(leftMotion, {
      toValue: 300,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [leftMotion]);

  const spinAround = useCallback(() => {
    Animated.timing(spinMotion, {
      toValue: 1,
      easing: Easing.linear,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => spinAround());
  }, [spinMotion]);

  const spin = spinMotion.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ContainerAnimated>
      <HeaderBack title="Animation" />
      <ContentAnimated>
        <Animated.View
          style={{
            top: topMotion,
            left: leftMotion,
            height: 40,
            width: 40,
            backgroundColor: '#00008b',
            position: 'relative',
          }}
        />
        <Animated.Image
          source={IMG_REACT_NATIVE}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            transform: [{rotate: spin}],
          }}
        />
        <Options>
          <BtnMove>
            <TextMove onPress={moveLeft}>Left</TextMove>
          </BtnMove>
          <BtnMove>
            <TextMove onPress={moveRight}>Right</TextMove>
          </BtnMove>
          <BtnMove>
            <TextMove onPress={moveUp}>Up</TextMove>
          </BtnMove>
          <BtnMove>
            <TextMove onPress={moveDown}>Down</TextMove>
          </BtnMove>
          <BtnMove onPress={spinAround}>
            <TextMove>Around</TextMove>
          </BtnMove>
        </Options>
      </ContentAnimated>
    </ContainerAnimated>
  );
});
const ContainerAnimated = styled.View`
  flex: 1;
  background-color: white;
`;
const ContentAnimated = styled.View`
  flex: 1;
`;

const BtnMove = styled.TouchableOpacity`
  height: 40px;
  border-radius: 4px;
  background-color: ${Colors.red1};
  align-items: center;
  align-self: center;
  padding: 10px;
  justify-content: center;
  top: 200px;
  position: relative;
`;

const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const TextMove = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
`;
