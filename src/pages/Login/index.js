import React, { useState } from 'react';
import { Alert } from 'react-native';
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
            <S.Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <S.Input
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <S.ButtonsContainer>
                <S.LoginButton title="Login" onPress={handleLogin} />
                <S.RegisterButton title="Registre-se" onPress={handleNavigateToRegister} />
            </S.ButtonsContainer>
        </S.Container>
    );
};

export default Login;
