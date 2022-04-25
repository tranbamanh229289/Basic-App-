import React, {useCallback, useMemo, useEffect, memo} from 'react';
import styled from 'styled-components/native';
import {HeaderBack} from '@/components/HeaderBack';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Linking, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';
import {IC_LOGOUT} from '@/assets';

export const ScanQRCodeScreen = memo(function ScannQRCodeScreen() {
  const onSuccess = (e: any) => {
    Linking.openURL(e.data).catch(err => {
      console.log('Error ', err);
    });
  };
  return (
    <ContainerScan>
      <HeaderBack title="Scanner" />
      {/*<QRCodeScanner*/}
      {/*  onRead={onSuccess}*/}
      {/*  flashMode={RNCamera.Constants.FlashMode.torch}*/}
      {/*  topContent={<Text>Goto wikipedia.org/wiki/QR_code</Text>}*/}
      {/*  bottomContent={*/}
      {/*    <TouchableOpacity>*/}
      {/*      <Text>Ok. Got it!</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  }*/}
      {/*/>*/}
      <QRImage>
        <QRCode value="https://google.com.vn" color="red" />
      </QRImage>
    </ContainerScan>
  );
});

const ContainerScan = styled.View``;
const QRImage = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
