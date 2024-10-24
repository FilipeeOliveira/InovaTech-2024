import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNewspaper, faUser, faMap } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones desejados
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Map from './pages/Map';

const Tab = createBottomTabNavigator();

export function Routes({ userCredentials }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Posts') {
                        iconName = faNewspaper; // Defina o ícone para a guia "Posts"
                    } else if (route.name === 'Perfil') {
                        iconName = faUser; // Defina o ícone para a guia "Profile"
                    } else if (route.name === 'Mapa') {
                        iconName = faMap;
                    }

                    // Retorna o ícone correspondente à guia
                    return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Posts" component={Posts} />
            <Tab.Screen name='Mapa' component={Map} />
            {userCredentials && (
                <Tab.Screen name="Perfil">
                    {props => <Profile {...props} userCredentials={userCredentials} />}
                </Tab.Screen>
            )}

        </Tab.Navigator>
    );
}
