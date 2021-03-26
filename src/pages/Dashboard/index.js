import React, { lazy, useEffect, Suspense } from 'react';
import {
    Card,
    Grid,
    Image
} from 'semantic-ui-react';
import { createMedia } from '@artsy/fresnel';
import callWeatherMapApi from '../../helpers/callApi';
import _ from 'lodash';
import dayjs from 'dayjs';
import Logo from '../../assets/logo.png';
import OpenWeatherLogo from '../../assets/openWeatherLogo.jpg';

const CurrentCard = lazy(() => import('../../components/CurrentCard'));
const DailyCardTable = lazy(() => import('../../components/DailyCardTable'));
const DailyCardAccordion = lazy(() => import('../../components/DailyCardAccordion'))

const DashBoard = () => {
    // TIME INTERVAL TO REQUEST DATA IN OPENWEATHERMAP
    const timeInterval = 1;

    // RESPONSIVE LAYOUT CONTROL
    const AppMedia = createMedia({
        breakpoints: {
            sm: 0,
            md: 768,
            lg: 1024,
            xl: 1192,
        },
    });
    const mediaStyle = AppMedia.createMediaStyle();
    const { Media, MediaContextProvider } = AppMedia;

    // PAGE LOADING CONTROLL
    const [loading, setLoading] = React.useState(true);

    // USER COORDINATES (LATITUDE AND LONGITUDE)
    const [position, setPosition] = React.useState({});

    // CURRENT DATA TO FORECAST WEATHER (REAL-TIME)
    const [currentData, setCurrentData] = React.useState({});
    
    // NEXT 7 DAYS DATA TO FORECAST WEATHER
    const [dailyData, setDailyData] = React.useState({});

    // DASHBOARD CONTROL TO SHOW DATA IN MOBILE LAYOUT
    const [activeDash, setActiveDash] = React.useState('current');

    /**
     * @name Handle Dash Daily
     * @description Set active dash to show daily data
     * @returns Active dash
     * @author Everson F. Feltrin
     * @since 2021-03-25
     */
    const handleDashDaily = () => setActiveDash('daily');

    /**
     * @name Handle Dash Current
     * @description Set active dash to show current data (real-time)
     * @returns Active dash
     * @author Everson F. Feltrin
     * @since 2021-03-25
     */
    const handleDashCurrent = () => setActiveDash('current');

    /**
     * @name Get Position
     * @description Get user coordinates
     * @returns {JSON} User latitude and longitude
     * @author Everson F. Feltrin
     * @since 2021-03-20
     */
    const getPosition = () => navigator.geolocation.getCurrentPosition(location => {
        // GET LATITUDE AND LONGITUDE IN LOCAL STORAGE
        const oldLat = localStorage.getItem('latitude');
        const oldLon = localStorage.getItem('longitude');
        
        // IF COORDINATES EXIST, CLEAN STORAGE TO KEEP COORDINATES UPDATED
        if ((oldLat !== null && oldLat !== location.coords.latitude) || (oldLon !== null && oldLon !== location.coords.longitude)) cleanLocalStorage();

        // SET USER COORDINATES
        setPosition({lat: location.coords.latitude, lon: location.coords.longitude})
    });


    /**
     * @name Clean Local Storage
     * @description Clean local storage registers
     * @author Everson F. Feltrin
     * @since 2021-03-25
     */
    const cleanLocalStorage = () => {
        localStorage.removeItem('lat');
        localStorage.removeItem('lon');
        localStorage.removeItem('current');
        localStorage.removeItem('daily');
    };


    /**
     * @name Set Local Storage Data
     * @description Set local storage data (latitude, longitude, currentData, dailyData)
     * @param {String} lat User latitude
     * @param {*} lon User longitude
     * @param {JSON} current Current data (real-time)
     * @param {Array[JSON]} daily Daily array data (next 7 days)
     * @author Everson F. Feltrin
     * @since 2021-03-25
     */
    const setLocalStorageData = (lat, lon, current, daily) => {
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', lon);
        localStorage.setItem('current', JSON.stringify(current));
        localStorage.setItem('daily', JSON.stringify(_.slice(daily, 1, daily.length)));
    } 

    /**
     * @name Get Data
     * @description Get data in open weather api and manage response data to use in system
     * @param {String} lat User latitude
     * @param {String} lon User longitude
     * @author Everson F. Feltrin
     * @since 2021-03-20
     */
    const getData = async (lat, lon) => {
        callWeatherMapApi(lat, lon)
            .then(response => {  
                // CREATE CURRENT DATA OBJECT WITH DATA RECEIVED FOR OPENWEATHER TO REAL-TIME
                const current = {
                    dt: dayjs(response.current.dt * 1000).format('DD/MM/YYYY HH:mm'),
                    groupIconUrl: `http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`,
                    humidity: response.current.humidity,
                    rain: _.get(response.current, 'rain.1h', 0),
                    temp: response.current.temp,
                    windSpeed: response.current.wind_speed
                };
                
                // CREATE DAILY DATA ARRAY WITH DATA RECEIVED FOR OPENWEATHER FOR THE NEXT 7 DAYS
                const daily = _.map(response.daily, row => {
                    return {
                        dt: dayjs(row.dt * 1000).format('DD/MM/YYYY HH:mm'),
                        groupIconUrl: `http://openweathermap.org/img/wn/${row.weather[0].icon}@2x.png`,
                        humidity: row.humidity,
                        rain: _.get(row, 'rain', 0),
                        temp: row.temp.day,
                        windSpeed: row.wind_speed
                    }
                })
                
                // SET LOCAL STORAGE DISCONSIDERING FIRST POSITION TO DAILY DATA
                setLocalStorageData(lat, lon, JSON.stringify(current), JSON.stringify(_.slice(daily, 1, daily.length)));
                
                // SET CURRENT DATA - USED FOR NOT CONSULT LOCAL STORAGE DATA FREQUENTLY
                setCurrentData(current);
                
                // SET DAILY DATA - USED FOR NOT CONSULT LOCAL STORAGE DATA FREQUENTLY
                setDailyData(_.slice(daily, 1, daily.length));
            });
    };

    useEffect (() => {
        if(loading === true) {            
            getPosition();
            setLoading(false);
        }
    /*eslint-disable-next-line*/
    }, [loading])
    
    useEffect (() => {       
        if(_.size(position) > 0) {
            /**
             * IF CURRENT DATA ON LOCAL STORAGE IS NULL, GET DATA FIRST TIME
             * ELSE DEFINE CURRENT AND DAILY DATA WITH LOCAL STORAGE DATA
             */
            if(localStorage.getItem('current') === null) {
                getData(position.lat, position.lon);

                // SET INTERVAL TO GET DATA IN OPENWEATHER AFTER FIRST CHARGE
                setInterval(() => getData(position.lat, position.lon), 60000 * timeInterval);
            } 
            else{
                setCurrentData(JSON.parse(localStorage.getItem('current')));
                setDailyData(JSON.parse(localStorage.getItem('daily')));
            }
            
        }     
    /*eslint-disable-next-line*/
    }, [position]);      

    return  [
        <style key='style'>{mediaStyle}</style>,
        <MediaContextProvider key='MediaContextProvider'>
            {
                // MOBILE LAYOUT
            }
            <Grid 
                as={Media}
                lessThan='md'
                textAlign='center' 
            >
                <Grid.Row style={{color: '#01afef', marginTop: '5px', marginBottom: '3px'}}>
                    {
                        // CARD TO SHOW LOGO AND DESCRIPTION ABOUT PROJECT
                    }
                    <Card>
                        <Card.Content textAlign='center'>
                            <Image 
                                centered 
                                size='small' 
                                src={Logo}
                                verticalAlign='middle'  
                            />
                            <p style={{fontSize: '15px', marginBottom: '0px', marginTop: '5px', textAlign: 'justify'}}>
                                <strong>Real-Time Weather é um sistema com o objetivo de facilitar a visualização de dados referentes ao clima em tempo real, tendo como fonte de informação a plataforma openWeather.</strong>
                            </p>
                            <p style={{fontSize: '15px', marginBottom: '0px', textAlign: 'justify'}}>
                                <strong>O sistema apresenta em sua tela inicial dados climáticos atualizados, permitindo ainda a visualização da previsão climática para os próximos 7 (sete) dias.</strong>
                            </p>
                        </Card.Content>
                    </Card>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: '0px', marginBottom: '3px'}}>
                    {
                        activeDash === 'current'
                        ?
                            // COMPONENT TO SHOW WEATHER FORECAST IN REAL-TIME FOR MOBILE LAYOUT
                            <Suspense fallback={<div>Loading...</div>}>
                                <CurrentCard 
                                    data={currentData}
                                    begin={dailyData.length > 0 ? _.split(dailyData[0].dt, ' ')[0] : ''}
                                    end={dailyData.length > 0 ? _.split(dailyData[6].dt, ' ')[0] : ''}
                                    handleDash={handleDashDaily}
                                    type='mobile'
                                />
                            </Suspense>                            
                        :
                            // COMPONENT TO SHOW WEATHER FORECAST FOR THE NEXT 7 DAYS FOR MOBILE LAYOUT
                            <Suspense fallback={<div>Loading...</div>}>
                                <DailyCardAccordion
                                    data={dailyData}                                    
                                    handleDash={handleDashCurrent}
                                />
                            </Suspense>
                    }
                </Grid.Row>  
                <Grid.Row style={{ paddingTop: '0px' }}>
                    {
                        // CARD WITH IMAGE AND LINK TO OPENWEATHERMAP DATA SOURCE
                    }
                    <Card>
                        <Card.Content textAlign='center'>
                            <Image
                                as='a'
                                centered
                                href='https://openweathermap.org/'
                                size='small'
                                src={OpenWeatherLogo}
                                target='_blank'
                                verticalAlign='middle'
                            />                            
                        </Card.Content>
                    </Card>
                </Grid.Row>                
            </Grid>

            {
                // DESKTOP LAYOUT
            }           
            <Grid 
                as ={Media} 
                greaterThanOrEqual='md'
                stackable 
            >
                <Grid.Row 
                    columns={3}
                    style={{backgroundColor: '#ffffff', color: '#01afef', height: '110px'}}
                >
                    {
                        // LOGO PROJECT
                    }
                    <Grid.Column width={3}>
                        <Image
                            centered
                            size='small'
                            src={Logo}
                            verticalAlign='middle'
                        />
                    </Grid.Column>
                    {
                        // DESCRIPTION ABOUT PROJECT
                    }
                    <Grid.Column width={10}>
                        <p style={{fontSize: '15px', marginBottom: '0px', marginTop: '5px', textAlign: 'justify'}}>
                            <strong>Real-Time Weather é um sistema com o objetivo de facilitar a visualização de dados referentes ao clima em tempo real, tendo como fonte de informação a plataforma openWeather.</strong>
                        </p>
                        <p style={{fontSize: '15px', marginBottom: '0px', textAlign: 'justify'}}>
                            <strong>O sistema apresenta em sua tela inicial dados climáticos atualizados, permitindo ainda a visualização da previsão climática para os próximos 7 (sete) dias.</strong>
                        </p>
                    </Grid.Column>
                    {
                        // IMAGE AND LINK TO OPENWEATHERMAP DATA SOURCE
                    }
                    <Grid.Column
                        textAlign='right' 
                        width={3}
                    >
                        <Image
                            as='a'
                            centered
                            href='https://openweathermap.org/'
                            target='_blank'
                            size='small'
                            src={OpenWeatherLogo}
                            verticalAlign='middle'
                        />
                    </Grid.Column>
                </Grid.Row>                
                <Grid.Row  columns={2}>
                    <Grid.Column 
                        style={{ padding: '0px 15px 0px 25px' }}
                        width={4}
                    >
                        {
                            // COMPONENT TO SHOW WEATHER FORECAST IN REAL-TIME FOR DESKTOP LAYOUT
                        }
                        <Suspense fallback={<div>Loading...</div>}>
                            <CurrentCard
                                data={currentData}
                                begin={dailyData.length > 0 ? _.split(dailyData[0].dt, ' ')[0] : ''}
                                end={dailyData.length > 0 ? _.split(dailyData[6].dt, ' ')[0] : ''}
                                handleDash={handleDashDaily}
                                type='desktop'
                            />
                        </Suspense>
                    </Grid.Column>
                    <Grid.Column  
                        style={{padding: '0px 25px 0px 10px'}}
                        width={12} 
                    >
                        {
                            // COMPONENT TO SHOW WEATHER FORECAST FOR THE NEXT 7 DAYS FOR DESKTOP LAYOUT
                        }
                        <Suspense fallback={<div>Loading...</div>}>
                            <DailyCardTable
                                style={{ backgroundColor: '#01afef', marginBottom: '10px', marginTop: '15px', width: '100%'}}
                                data={dailyData}
                            />
                        </Suspense>
                    </Grid.Column>                    
                </Grid.Row>               
            </Grid>
        </MediaContextProvider>
    ]
};

export default DashBoard;