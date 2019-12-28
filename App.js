import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PermissionsAndroid, TouchableOpacity} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: 'Location permission for bluetooth scanning',
                message: 'wahtever',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission for bluetooth scanning granted');
            return true;
        } else {
            console.log('Location permission for bluetooth scanning revoked');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export default class App extends Component<Props> {

    constructor() {
        super();
        this.manager = new BleManager();
    }

    componentWillMount() {

    }

    allowConnect = () => {
        requestLocationPermission()
    };
    scanAndConnect = () => {

        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                alert('error', error);
                console.log(error);
                return
            }

            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'TI BLE Sensor Tag' ||
                device.name === 'SensorTag') {
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();
                // Proceed with connection.
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <TouchableOpacity onPress={this.allowConnect}>
                    <Text>Allow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.scanAndConnect}>
                    <Text>search BlueTooth</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
