import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 25px;
    flex: 1;
    padding: 16px;
    background-color: #fff;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
`;

export const Body = styled.Text`
    font-size: 16px;
    margin-bottom: 16px;
`;

export const CommentItem = styled.View`
    background-color: #DAD8D6;
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    elevation: 2;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
`;
