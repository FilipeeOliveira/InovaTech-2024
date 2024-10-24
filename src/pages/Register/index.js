import React, { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Input, RegisterButton } from './RegisterStyles';

function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            const existingUser = await AsyncStorage.getItem(username);
            if (existingUser !== null) {
                Alert.alert('Erro', 'Nome de usuário já existe');
            } else {
                await AsyncStorage.setItem(username, JSON.stringify({ password }));
                Alert.alert('Sucesso', 'Usuário registrado com sucesso');
                navigation.replace('Login');
            }
        } catch (error) {
            console.error('Erro ao salvar dados de registro:', error);
        }
    };

    return (
        <Container>
            <Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <Input
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <RegisterButton title="Register" onPress={handleRegister} />
        </Container>
    );
};

export default Register;
