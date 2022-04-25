import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from '@/themes/Colors';
import {IC_BACK} from '@/assets';
import {Dimensions} from 'react-native';
import {goBack, openAddCameraScreen} from '@/utils/navigation';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Dimensions.get('window').width}px;
  height: ${getStatusBarHeight() + 56}px;
  z-index: 1;
  padding-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.TouchableOpacity`
  width: 60px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.white};
`;
const Right = styled.TouchableOpacity`
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
`;
const TextEdit = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;
interface RawDetailHeader {
  id: string;
}
export const DetailHeader = memo(function HomeHeader(id: RawDetailHeader) {
  const handleNavigationEdit = useCallback(
    () => openAddCameraScreen({id: id}),
    [],
  );
  return (
    <Container>
      <Left onPress={goBack}>
        <Icon source={IC_BACK} />
      </Left>
      <Right onPress={handleNavigationEdit}>
        <TextEdit>Edit</TextEdit>
      </Right>
    </Container>
  );
});
