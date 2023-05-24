import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: ${(props) => props.disabled ? '#999' : props.primary ? '#FA824C' : '#FFFFFF'};
  border-width: 1px;
  border-color: ${(props) => props.disabled ? '#999' : '#FA824C'};
  border-radius: 12px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
`;
