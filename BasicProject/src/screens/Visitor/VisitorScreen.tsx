import React, {memo} from 'react';
import styled from 'styled-components/native';
import {HeaderBack} from '@/components/HeaderBack';
import {Colors} from '@/themes/Colors';

export const VisitorScreen = memo(() => {
  return (
    <ContainerInvite>
      <HeaderBack title={'Invite List'} />
      <ContentInvite>
        <Menus>
          <SelectLocationCompany></SelectLocationCompany>
          <WrapperSearch>
            <InputSearch placeholder="Search for name or pho" />
          </WrapperSearch>
          <BtnGuest>
            <TextGuest>Guest</TextGuest>
          </BtnGuest>
        </Menus>
        <Options>
          <SelectFilter></SelectFilter>
          <BtnInvite>
            <TextOption>Invite</TextOption>
          </BtnInvite>
          <BtnRemove>
            <TextOption>Remove</TextOption>
          </BtnRemove>
        </Options>
        <ListVisitor>
          <HeaderList>
            <TitleHeaderList>Visitor Name</TitleHeaderList>
            <TitleHeaderList>Purpose</TitleHeaderList>
            <TitleHeaderList>Picture</TitleHeaderList>
            <TitleHeaderList>Status</TitleHeaderList>
          </HeaderList>
          <ContentList></ContentList>
        </ListVisitor>
      </ContentInvite>
    </ContainerInvite>
  );
});

const ContainerInvite = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
const ContentInvite = styled.View`
  flex: 1;
`;
const Menus = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`;
const Options = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.gray6};
`;
const ListVisitor = styled.View``;
const HeaderList = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const ContentList = styled.View``;
const SelectLocationCompany = styled.View``;
const WrapperSearch = styled.View``;
const InputSearch = styled.TextInput`
  font-size: 10px;
  width: 150px;
`;
const BtnOption = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
`;
const BtnGuest = styled(BtnOption)`
  width: 80px;
  background-color: ${Colors.backgroundColor};
`;
const BtnInvite = styled(BtnOption)`
  width: 60px;
  background-color: ${Colors.backgroundColor};
`;
const BtnRemove = styled(BtnOption)`
  width: 70px;
  background-color: ${Colors.red1};
`;
const TextOption = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;
const TextGuest = styled(TextOption)`
  font-size: 14px;
`;
const SelectFilter = styled.View``;

const TitleHeaderList = styled.Text`
  color: ${Colors.green2};
  font-size: 12px;
  font-weight: 500;
`;
