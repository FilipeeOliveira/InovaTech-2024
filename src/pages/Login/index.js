import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
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
                source={require('../../../assets/adaptive-icon.png')}
                style={{ width: 100, height: 100, marginBottom: 20 }}
            />

            <S.Input
                placeholder="Digite seu usuário."
                value={username}
                onChangeText={setUsername}
            />
            <S.Input
                placeholder="Digite sua senha."
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <S.ButtonsContainer>
                <S.LoginButton title="Entrar" onPress={handleLogin} />
                <S.RegisterButton title="Registre-se" onPress={handleNavigateToRegister} />
            </S.ButtonsContainer>
        </S.Container>
    );
};

export default Login;
