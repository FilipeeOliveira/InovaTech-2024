import React, { useState } from 'react';
import { Alert, Image, Text } from 'react-native';
import * as S from './LoginStyles';

const Login = ({ navigation, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }
        onLogin(username, password);
    };

    const handleNavigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <S.Container>
            <Image
                source={require('../../../assets/logo_fireSense.png')}
                style={{ width: 150, height: 150, marginBottom: 30 }}
            />

            <S.Input
                placeholder="Login"
                placeholderTextColor="#FFFFFF"
                value={username}
                onChangeText={setUsername}
            />
            <S.Input
                placeholder="Senha"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <S.ButtonsContainer>
                <S.LoginButton onPress={handleLogin}>
                    <S.ButtonText>Entrar</S.ButtonText>
                </S.LoginButton>
            </S.ButtonsContainer>

            <S.MessageContainer>
                <Text>
                    <S.NewHereText>Novo por aqui? </S.NewHereText>
                    <S.HighlightText onPress={handleNavigateToRegister}>Crie sua conta</S.HighlightText>
                </Text>
            </S.MessageContainer>
        </S.Container>
    );
};

export default Login;
