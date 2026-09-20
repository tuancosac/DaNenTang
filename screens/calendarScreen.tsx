import { Text, View, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getAstronomyData } from "../services/nasaApi";
import { AstronomyEvent } from "../types/astronomy";

import * as Astronomy from "astronomy-engine";

import UniverseBackground from '../components/background';


export default function App() {

    const [data, setData] = useState<any>(null);

    // const [nextFullMoon, setNextFullMoon] = useState<any>(null);

    const [events, setEvents] = useState<AstronomyEvent[]>([]);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        // Astronomy.

        loadData();

        const moonEvents = getMoonEvents();

        // console.log(moonEvents);
        setEvents(moonEvents);

        const eclipseEvents = getEclipseEvents();
        setEvents(eclipseEvents);
        console.log("Eclipse Events" , eclipseEvents)
        // expandAction();

    },[]);


    const newMoon = events[0];
    const firstQuarter = events[1];
    const fullMoon = events[2];
    const lastQuarter = events[3];

    const sortedEvents = [...events].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );
    // console.log( "SortedEvents",sortedEvents)

    console.log(Astronomy);

    async function loadData() {
        try{
            const result = await getAstronomyData();

            console.log("Astronomy data:", result);

            setData(result);
        } catch (error) {
            console.error("Error fetching astronomy data:", error);
        }
    }

    function getMoonEvents(): AstronomyEvent[]{
        const now = new Date();
        
        const newMoon = Astronomy.SearchMoonPhase(
            0, now, 40
        );

        const firstQuarter = Astronomy.SearchMoonPhase(
            90, now, 40
        );

        const fullMoon = Astronomy.SearchMoonPhase(
            180, now, 40
        );

        const lastQuarter = Astronomy.SearchMoonPhase(
            270, now, 40
        );

        return[
            {
                id: "new-moon",
                title: "Trăng non",
                type: "moon",
                date: newMoon? newMoon.date : new Date(),
                description: "Mặt Trăng bước vào pha trăng non.",
                icon: "🌑",

            },
            {
                id: "first-quarter",
                title: "Thượng huyền",
                type: "moon",
                date: firstQuarter? firstQuarter.date : new Date(),
                description: "Mặt Trăng bước vào pha thượng huyền.",
                icon: "🌓",
            },
            {
                id: "full-moon",
                title: "Trăng tròn",
                type: "moon",
                date: fullMoon? fullMoon.date : new Date(),
                description: "Mặt Trăng đạt pha tròn.",
                icon: "🌕",
            },
            {
                id: "last-quarter",
                title: "Hạ huyền",
                type: "moon",
                date: lastQuarter? lastQuarter.date : new Date(),
                description: "Mặt Trăng bước vào pha hạ huyền.",
                icon: "🌗",
            }
        ]
    }

    function getEclipseEvents(): AstronomyEvent[]{
        const now = new Date();

        const lunar = Astronomy.SearchLunarEclipse(now);
        // console.log("Nhat thuc",nhatthuc)
        const solar = Astronomy.SearchGlobalSolarEclipse(now);

        return [
            {
                id: "lunar-eclipse",
                title: "Nguyệt thực",
                type: "esclipe",
                date: lunar.peak ? lunar.peak.date : new Date(),
                description: `Nguyệt thực (Pha/Loại: ${lunar.kind}, Độ che khuất: ${lunar.obscuration})`,
                icon: "🌑",
            },
            {
                id: "solar-eclipse",
                title: "Nhật thực",
                type: "esclipe",
                date: solar.peak ? solar.peak.date : new Date(),
                description: `Nhật thực (Loại: ${solar.kind}${solar.latitude !== undefined ? `, Tọa độ: ${solar.latitude}°,${solar.longitude}°` : ''})`,
                icon: "🌑",
            }

        ];
    }

    function expandAction(){
        if(expanded){
            // console.log('ok')
            setExpanded(false);
        }else{
            setExpanded(true);
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

            <Pressable onPress={expandAction} style={styles.eventTitle}>
                <Text style={styles.cardTitle}>Mặt Trăng</Text> 
            </Pressable>    
            
   
            {expanded && (
                <View>
                    <View style = {styles.card} >
                        <Text style={styles.cardTitle}>{newMoon?.icon} {newMoon?.title}</Text>
                        <Text style={styles.cardItems}>{ newMoon ? newMoon.date.toLocaleString() : "Đang tải..."}</Text>
                        <Text style={styles.cardItems}>{newMoon?.description}</Text>
                    </View>

                    <View style = {styles.card}>
                        <Text style={styles.cardTitle}>{firstQuarter?.icon} {firstQuarter?.title}</Text>
                        <Text style={styles.cardItems}>{ firstQuarter ? firstQuarter.date.toLocaleString() : "Đang tải..."}</Text>
                        <Text style={styles.cardItems}>{firstQuarter?.description}</Text>
                    </View>
                    
                    <View style = {styles.card}>
                        <Text style={styles.cardTitle}>{fullMoon?.icon} {fullMoon?.title}</Text>
                        <Text style={styles.cardItems}>{ fullMoon ? fullMoon.date.toLocaleString() : "Đang tải..."}</Text>
                        <Text style={styles.cardItems}>{fullMoon?.description}</Text>
                    </View>

                    <View style = {styles.card}>
                        <Text style={styles.cardTitle}>{lastQuarter?.icon} {lastQuarter?.title}</Text>
                        <Text style={styles.cardItems}>{ lastQuarter ? lastQuarter.date.toLocaleString() : "Đang tải..."}</Text>
                        <Text style={styles.cardItems}>{lastQuarter?.description}</Text>
                    </View>    
                </View>
                )
            }
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
    card: {
        padding: 10,
        backgroundColor: '#94908D',
        gap:5,
        fontSize: 14,
        borderColor: '#31302E'
    },
    cardItems:{
        color: '#cbd5e1',
    },
    cardTitle:{
        color: "#31302E",
        padding: 15,
        fontSize: 24,
        backgroundColor: "#DAD9D7"
    },
    content:{
        color: '#39a9c2',
        padding:20

    }
});