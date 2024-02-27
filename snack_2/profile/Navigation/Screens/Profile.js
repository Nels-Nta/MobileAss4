import React, { useState, useEffect } from 'react';
import { Button, Image, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [image, setImage] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);

    useEffect(() => {
        // Load image URI from local storage on component mount
        loadImageFromStorage();

        // Check camera permissions
        checkCameraPermission();
    }, []);

    const saveImageToStorage = async (uri) => {
        try {
            await AsyncStorage.setItem('profileImage', uri);
        } catch (error) {
            console.error('Error saving image to local storage:', error);
        }
    };

    const loadImageFromStorage = async () => {
        try {
            const storedImage = await AsyncStorage.getItem('profileImage');
            if (storedImage) {
                setImage(storedImage);
            }
        } catch (error) {
            console.error('Error loading image from local storage:', error);
        }
    };

    const checkCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermission(status === 'granted');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        handleImagePickerResult(result);
    };

    const takePhoto = async () => {
        if (!cameraPermission) {
            console.error('Camera permission not granted');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        handleImagePickerResult(result);
    };

    const handleImagePickerResult = (result) => {
        console.log(result);

        if (!result.cancelled) {
            const selectedImage = result.assets[0].uri;
            setImage(selectedImage);
            // Save the image URI to local storage
            saveImageToStorage(selectedImage);
        }
    };

    const deleteImage = async () => {
        try {
            await AsyncStorage.removeItem('profileImage');
            setImage(null);
        } catch (error) {
            console.error('Error deleting image from local storage:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title="Take a photo" onPress={takePhoto} />

            {image && (
                <View
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        overflow: 'hidden',
                        marginVertical: 20,
                    }}
                >
                    <Image
                        source={{ uri: image }}
                        style={{ flex: 1, width: null, height: null }}
                    />
                </View>
            )}

            {image && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={deleteImage}>
                        <Text style={{ color: 'red', fontSize: 16, marginVertical: 10 }}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
