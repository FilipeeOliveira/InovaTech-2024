import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Container, ProfileImage, Placeholder, PlaceholderText, Input, Username, Password, Buttons, ButtonContainer } from './ProfileStyles';

const STORAGE_KEY = '@profile_image';

function Profile({ userCredentials }) {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(userCredentials.username);
    const [password, setPassword] = useState(userCredentials.password);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        loadProfileImage();
    }, []);

    const loadProfileImage = async () => {
        try {
            const savedImage = await AsyncStorage.getItem(`${username}_profile_image`);
            if (savedImage) {
                setProfileImage(savedImage);
            }
        } catch (error) {
            console.error('Erro ao carregar imagem do perfil:', error);
        }
    };

    const saveProfileImage = async (imageUri) => {
        if (imageUri) {
            try {
                await AsyncStorage.setItem(`${username}_profile_image`, imageUri);
            } catch (error) {
                console.error('Erro ao salvar imagem do perfil:', error);
            }
        }
    };

    const saveProfileData = async () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert('Erro', 'Os campos de usuário e senha não podem estar vazios.');
            return;
        }

        try {
            await AsyncStorage.removeItem(userCredentials.username);

            const updatedUserData = { username, password };
            await AsyncStorage.setItem(username, JSON.stringify(updatedUserData));

            setIsEditing(false);
            Alert.alert('Sucesso', 'Dados do perfil atualizados com sucesso');
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados do perfil');
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua biblioteca de mídia.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Garante uma seleção quadrada
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            saveProfileImage(result.assets[0].uri);
        }
    };

    return (
        <Container>
            {selectedImage ? (
                <ProfileImage source={{ uri: selectedImage }} />
            ) : profileImage ? (
                <ProfileImage source={{ uri: profileImage }} />
            ) : (
                <Placeholder>
                    <PlaceholderText>Nenhuma imagem</PlaceholderText>
                </Placeholder>
            )}
            {isEditing ? (
                <>
                    <Input
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Usuário"
                    />
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        secureTextEntry={true}
                    />
                    <Button title="Salvar" onPress={saveProfileData} />
                </>
            ) : (
                <>
                    <Username>Usuário: {username}</Username>
                    <Password>Senha: {password}</Password>
                    <Buttons>
                        <ButtonContainer>
                            <Button title="Editar" onPress={() => setIsEditing(true)} />
                        </ButtonContainer>
                        <Button title="Adicionar/Trocar Imagem" onPress={pickImage} />
                    </Buttons>
                </>
            )}
        </Container>
    );
}

export default Profile;
