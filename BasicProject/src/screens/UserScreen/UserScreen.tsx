import React, {memo, useCallback, useEffect, useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {goBack, replaceWithMainScreen} from '@/utils/navigation';
import {useUser} from '@/store/constant';
import Global from '@/utils/Global';
import {InputBorder} from '@/components/InputBorder';
import {HeaderBack} from '@/components/HeaderBack';
import {RawUser} from '@/types';
import {EditUserParams, requestEditUser} from '@/store/constant/functions';
import {
  getByKey,
  getCurrentUser,
  getListByKey,
  getListKey,
  syncAddUser,
  syncUpdateUser,
} from '@/store/auth';
import {SelectModalBottom} from '@/components/BottomMenu/SelectModalBottom';
import {BaseStyles} from '@/themes/BaseStyles';
import {generateNumber} from '@/utils/constants';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.white};
  padding: 0 16px;
`;

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

const BtnUpdate = styled.TouchableOpacity`
  margin-top: 16px;
  height: 44px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${Colors.backgroundColor};
`;

const TextUpdate = styled.Text`
  font-size: 16px;
  color: ${Colors.white};
  font-weight: bold;
`;

const ImageAvatar = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: #00008b;
  align-self: center;
  margin-top: 20px;
`;

export const UserScreen = memo(function HomeScreen() {
  const user = useMemo(() => getCurrentUser(), []);
  const [params, setParams] = useState<RawUser>(user);

  const maleOptions = useMemo(
    () => [
      {
        value: true,
        label: 'nam',
      },
      {
        value: false,
        label: 'nữ',
      },
    ],
    [],
  );
  const ageOptions = useMemo(() => {
    return generateNumber(18, 90);
  }, []);

  const onValueChange = useCallback(
    (keyName: string, value: any) => {
      setParams({
        ...params,
        [keyName]: value,
      });
    },
    [params],
  );
  const handleUpdate = useCallback(() => {
    syncUpdateUser(params);
    goBack();
  }, [params]);

  return (
    <>
      <HeaderBack title={'Cập nhật thông tin'} />
      <Container behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ImageAvatar />

        <SInputBorder
          value={params?.name || ''}
          keyName={'name'}
          placeHolder={'Họ và tên'}
          onTextChange={onValueChange}
        />
        <SelectModalBottom
          containerStyle={BaseStyles.mt12}
          selectedValue={params.age}
          label="Nhập tuổi"
          options={ageOptions}
          inputName={'age'}
          onSelectOption={onValueChange}
        />
        <SelectModalBottom
          containerStyle={BaseStyles.mt12}
          label="Chọn giới tính"
          options={maleOptions}
          selectedValue={params.male}
          inputName={'male'}
          onSelectOption={onValueChange}
          placeholder={'Chọn giới tính'}
        />
        <BtnUpdate onPress={handleUpdate}>
          <TextUpdate>Cập nhật</TextUpdate>
        </BtnUpdate>
      </Container>
    </>
  );
});
