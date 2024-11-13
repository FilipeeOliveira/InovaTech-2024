import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {
    Container, Header, ImageContainer, TouchableImage, ProfileImage, Placeholder,
    PlaceholderText, EditButtonContainer, Content, Input, Buttons, Title
} from './ProfileStyles';

const STORAGE_KEY = '@profile_image';

function Profile({ userCredentials }) {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(userCredentials.username);
    const [password, setPassword] = useState(userCredentials.password);
    const [isEditing, setIsEditing] = useState(false);

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
                setProfileImage(imageUri);
            } catch (error) {
                console.error('Erro ao salvar imagem do perfil:', error);
            }
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
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            saveProfileImage(result.assets[0].uri);
        }
    };

    const handleImagePress = () => {
        Alert.alert(
            'Alterar Imagem de Perfil',
            'Você deseja alterar a imagem de perfil?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim', onPress: pickImage },
            ]
        );
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
            Alert.alert('Sucesso', 'Dados do perfil atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados do perfil');
        }
    };

    return (
        <Container>
            <Header>
                <EditButtonContainer>
                    <Button title="Editar" onPress={() => setIsEditing(true)} />
                </EditButtonContainer>
                <ImageContainer>
                    <TouchableImage onPress={handleImagePress}>
                        {profileImage ? (
                            <ProfileImage source={{ uri: profileImage }} />
                        ) : (
                            <Placeholder>
                                <PlaceholderText>Nenhuma imagem</PlaceholderText>
                            </Placeholder>
                        )}
                    </TouchableImage>
                </ImageContainer>
            </Header>

            {/* Título "Minhas Denúncias" */}
            <Title>Minhas Denúncias</Title>

            <Content>
                {isEditing && (
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
                )}
            </Content>
        </Container>
    );

}

export default Profile;
