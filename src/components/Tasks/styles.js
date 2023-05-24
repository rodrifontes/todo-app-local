import styled from 'styled-components/native';

export const Task = styled.View`
  margin: 0px 20px 24px;
  padding: 24px;
  border-width: 1px;
  border-color: #EEEEEE;
  border-radius: 12px;
  gap: 24px;
`;

export const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaskDescription = styled.View`

`;

export const TaskFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaskStatus = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ActionIcon = styled.Image`
  width: 16px;
  height: 16px;
  resize-mode: contain;
`;

export const TaskActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;