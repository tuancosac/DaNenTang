import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getAstronomyData } from "../services/nasaApi";

import UniverseBackground from '../components/background';

export default function App() {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        loadData();
    },[]);

    async function loadData() {
        try{
            const result = await getAstronomyData();

            console.log("Astronomy data:", result);

            setData(result);
        } catch (error) {
            console.error("Error fetching astronomy data:", error);
        }
    }

    return (
    <UniverseBackground>  
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Lịch thiên văn 🌌</Text>

            <Text style={styles.title}>Hôm nay</Text>
            <Text style={styles.date}>{data ? data.date : "Đang tải..."}</Text>

            <Text style={styles.eventTitle}>Sự kiện thiên văn</Text>

            <Text style={styles.event}>{data ? data.title : "Đang tải..."}</Text>
            {/* <Text style={styles.event}>☄️ Mưa sao băng</Text>
            <Text style={styles.event}>🌑 Nhật thực</Text> */}

            <View style={styles.imageContainer}>   
                <Image
                    source={{ uri: data?.hdurl }} 
                    style={styles.image} 
                    resizeMode="cover"
                />
                <ScrollView style={styles.explanationContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.explanation}>
                        {data ? data.explanation : "Đang tải..."}
                    </Text>
                </ScrollView>
            </View>

            <Text style={styles.eventTitle}>Xem các sự kiện sắp tới</Text>
            {/* <Text style={styles.event}>📅 Ngày: {data ? data.date : "Đang tải..."}</Text>
            <Text style={styles.event}>📝 Mô tả: {data ? data.explanation : "Đang tải..."}</Text> */}

        </ScrollView>
    </UniverseBackground>  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,   
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 50,
        color: '#ffffff',
        letterSpacing: 1,
        // textShadowOffset: { width: 0, height: 2 },
        // textShadowRadius: 4,
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {   
        fontSize: 26, 
        fontWeight: 'bold',
        marginTop: 20,
        color: '#ffffff',
    },
    date: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10,
        color: '#AAB4C5',
    },
    eventTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 24,
        color: '#ffffff',
    },
    event: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10,
        color: '#ffffff',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: '100%',
        height: 500,
    },
    explanation: {
        fontSize: 16,
        marginTop: 10,
        padding: 10,
        lineHeight: 25,
        color: '#cbd5e1',
    },
    explanationContainer: {
        marginTop: 10,
        maxHeight: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    imageContainer: {
        margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
        // borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
    },
});