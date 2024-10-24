import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 16px;
    background-color: #DAD8D6;
`;

export const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.View`
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-offset: 0px 2px; /* Corrigido */
    shadow-radius: 8px;
    elevation: 2;
`;

export const PostItem = styled.View`
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;

export const Body = styled.Text`
    font-size: 14px;
    color: #667;
`;

export const ButtonContainer = styled.View`
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export const IconContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const IconText = styled.Text`
    margin-left: 5px;
`;

export const ShareContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ShareText = styled.Text`
    margin-left: 5px;
    color: blue;
`;
