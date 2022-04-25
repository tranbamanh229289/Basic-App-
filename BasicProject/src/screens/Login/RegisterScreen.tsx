import React, {memo, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputBorder} from '@/components/InputBorder';
import {IC_BACK, IMG_LOGO_SMALL} from '@/assets';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  goBack,
  navigateToLoginScreen,
  openCameraScreen,
} from '@/utils/navigation';
import {RawUser} from '@/types';
import {BaseStyles} from '@/themes/BaseStyles';
import {SelectModalBottom} from '@/components/BottomMenu/SelectModalBottom';
import {generateNumber} from '@/utils/constants';
import {validateEmail} from '@/utils/validate';
import ToastService from '@/services/ToastService';
import {checkAccountDuplicate, syncAddUser} from '@/store/auth';

const {width: DWidth} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const Top = styled.View`
  height: 140px;
  margin-top: ${getStatusBarHeight()}px;
  align-items: center;
  justify-content: flex-end;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  background-color: #0077cc;
  border-radius: 50px;
`;

const Bottom = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${Colors.gray1};
  font-size: 20px;
  font-weight: bold;
`;
const ContainerInput = styled.View`
  width: 100%;
  padding: 0 16px;
  margin-top: 12px;
`;

const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: #cc4c5b;
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginText = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
`;

const Footer = styled.View`
  width: 100%;
  padding-bottom: 12px;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: ${Colors.black};
`;

const ViewSpaceBetween = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const TextForgot = styled.Text`
  color: ${Colors.gray2};
  font-size: 14px;
  padding-left: 6px;
`;

const BtnRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
const IconSmall = styled.Image`
  tint-color: ${Colors.gray1};
  width: 18px;
  height: 18px;
`;

const BtnBack = styled.TouchableOpacity`
  position: absolute;
  top: ${getStatusBarHeight()}px;
  left: 20px;
  height: 44px;
  width: 40px;
  flex-direction: row;
  align-items: center;
  z-index: 1;
`;

const IconBack = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.gray1};
`;
const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 12,
  },
})``;

export const RegisterScreen = memo(function RegisterScreen() {
  const [params, setParams] = useState<RawUser>({
    name: '',
    age: '20',
    male: true,
    email: '',
    password: '',
  });
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeRePassword = useCallback(
    (keyName: string, text: string) => {
      setRePassword(text);
    },
    [rePassword],
  );

  const onTextChange = useCallback(
    (keyname: string, value: any) => {
      if (typeof value === 'string') {
        value = value.trim();
      }
      setParams({
        ...params,
        [keyname]: value,
      });
    },
    [params],
  );

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

  const checkValidate = useCallback((): boolean => {
    if (!validateEmail(params.email)) {
      ToastService.showError('Invalid Email', '');
      return false;
    }
    if (!params.name) {
      ToastService.showError('Required field name', '');
      return false;
    }
    if (!params.age) {
      ToastService.showError('Required field age', '');
      return false;
    }
    if (!params.email) {
      ToastService.showError('Required field email', '');
      return false;
    }
    if (!params.password) {
      ToastService.showError('Required field password', '');
      return false;
    }
    console.log(rePassword);
    if (!rePassword) {
      ToastService.showError('Required field re password', '');
      return false;
    }
    if (rePassword.trim() !== params.password.trim()) {
      ToastService.showError('password and re password not match!', '');
      return false;
    }
    if (!checkAccountDuplicate(params.email)) {
      ToastService.showError('email is duplicate!', '');
      return false;
    }
    return true;
  }, [params, rePassword]);

  const handleRegister = useCallback(() => {
    setIsLoading(true);
    const validate: boolean = checkValidate();
    if (validate) {
      syncAddUser({...params});
      navigateToLoginScreen({email: params.email});
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return;
    }
  }, [params, rePassword]);

  return (
    <Container>
      <BtnBack onPress={goBack}>
        <IconBack source={IC_BACK} />
      </BtnBack>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Top>
          <Logo />
        </Top>
        <Bottom>
          <Title>Đăng ký tài khoản Zalo</Title>
          <ContainerInput>
            <SInputBorder
              value={params.name}
              keyName={'name'}
              onTextChange={onTextChange}
              placeHolder={'Nhập vào họ và tên'}
            />
            <SelectModalBottom
              containerStyle={BaseStyles.mt12}
              selectedValue={params.age}
              label="Nhập tuổi"
              options={ageOptions}
              inputName={'age'}
              onSelectOption={onTextChange}
            />
            <SelectModalBottom
              containerStyle={BaseStyles.mt12}
              label="Chọn giới tính"
              options={maleOptions}
              selectedValue={params.male}
              inputName={'male'}
              onSelectOption={onTextChange}
              placeholder={'Chọn giới tính'}
            />
            <SInputBorder
              value={params.email}
              keyName={'email'}
              onTextChange={onTextChange}
              placeHolder={'Nhập vào email'}
            />
            <SInputBorder
              value={params.password}
              keyName={'password'}
              onTextChange={onTextChange}
              placeHolder={'Nhập mật khẩu của bạn'}
            />
            <SInputBorder
              value={rePassword}
              keyName={'re_password'}
              onTextChange={handleChangeRePassword}
              placeHolder={'Nhập lại mật khẩu'}
            />

            <BtnLogin onPress={handleRegister}>
              {isLoading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <LoginText>Đăng ký</LoginText>
              )}
            </BtnLogin>
          </ContainerInput>
        </Bottom>
      </KeyboardAvoidingView>
      <Footer>
        <FooterText>Copyright 2020 Motorshop. All Rights Reserved</FooterText>
      </Footer>
    </Container>
  );
});
