import React from 'react';
import {
    Button,
    Card,
    Image,
    List
} from 'semantic-ui-react';
import {
    WiHumidity,
    WiRaindrops,
    WiStrongWind,
    WiThermometer
} from 'weather-icons-react';
import _ from 'lodash';

/**
 * @name Current Card
 * @description Function to mount current weather forecast data card
 * @param {JSON} props Entry data
 * @returns {JSON} Current card component
 * @author Everson F. Feltrin
 * @since 2021-03-25
 */
const CurrentCard = (props) => {
    return (
        // CARD TO SHOW WEATHER FORECAST IN REAL TIME
        <Card style={{ backgroundColor: '#01afef', marginBottom: '0px', width: `${props.type === 'desktop' ? '100%' : ''}`}}>
            {
                // CARD CONTENT TO SHOW CURRENT DATA HEADER
            }
            <Card.Content
                style={{ backgroundColor: '#01afef', color: '#ffffff', }}
                textAlign="center"
            >
                <Image
                    centered
                    size='small'
                    src={props.data.groupIconUrl}
                    verticalAlign='middle'
                />
                <p style={{ fontSize: '20px', marginBottom: '0px' }}>
                    <strong>{_.split(props.data.dt, ' ')[1]}</strong>
                </p>
                <p style={{ fontSize: '16px', marginBottom: '0px' }}>
                    <strong>{_.split(props.data.dt, ' ')[0]}</strong>
                </p>
                <Card.Meta>PREVISÃO METEOROLÓGICA</Card.Meta>
            </Card.Content>
            {
                // CARD CONTENT TO SHOW CURRENT DATA
            }
            <Card.Content
                style={{ backgroundColor: '#ffffff', color: '#01afef', fontSize: '40px', height: '80%' }}
            >
                <List
                    celled
                    key={`${Math.floor(Math.random() * 99999999999 + 1)}`}
                    size='mini'
                    verticalAlign='middle'
                >
                    {
                        // CURRENT TEMP
                    }
                    <List.Item key={`${Math.floor(Math.random() * 99999999999 + 1)}`}>
                        <p style={{ color: '#000000', fontSize: '10px', marginBottom: '2px', textAlign: 'center' }}>
                            TEMPERATURA DO AR
                                            </p>
                        <List.Content floated="right">
                            <List.Icon size="large">
                                <WiThermometer color={'#01afef'} />
                            </List.Icon>
                        </List.Content>
                        <List.Content floated="left">
                            <List.Item style={{ fontSize: '15px' }}>
                                {`${props.data.temp} ºC`}
                            </List.Item>
                        </List.Content>
                    </List.Item>
                    {
                        // CURRENT HUMIDITY
                    }
                    <List.Item key={`${Math.floor(Math.random() * 99999999999 + 1)}`}>
                        <p style={{ color: '#000000', fontSize: '10px', marginBottom: '2px', textAlign: 'center' }}>
                            UMIDADE RELATIVA DO AR
                                            </p>
                        <List.Content floated="right">
                            <List.Icon size="large">
                                <WiHumidity color={'#01afef'} />
                            </List.Icon>
                        </List.Content>
                        <List.Content floated="left">
                            <List.Item style={{ fontSize: '15px' }}>
                                {`${props.data.humidity} %`}
                            </List.Item>
                        </List.Content>
                    </List.Item>
                    {
                        // CURRENT WIND SPEED
                    }
                    <List.Item key={`${Math.floor(Math.random() * 99999999999 + 1)}`}>
                        <p style={{ color: '#000000', fontSize: '10px', marginBottom: '2px', textAlign: 'center' }}>
                            VELOCIDADE DO VENTO
                                            </p>
                        <List.Content floated="right">
                            <List.Icon size="large">
                                <WiStrongWind color={'#01afef'} />
                            </List.Icon>
                        </List.Content>
                        <List.Content floated="left">
                            <List.Item style={{ fontSize: '15px' }}>
                                {`${props.data.windSpeed} m/s`}
                            </List.Item>
                        </List.Content>
                    </List.Item>
                    {
                        // CURRENT RAIN 1H
                    }
                    <List.Item key={`${Math.floor(Math.random() * 99999999999 + 1)}`}>
                        <p style={{ color: '#000000', fontSize: '10px', marginBottom: '2px', textAlign: 'center' }}>
                            VOLUME DE CHUVA DA ÚLTIMA HORA
                                            </p>
                        <List.Content floated="right">
                            <List.Icon size="large">
                                <WiRaindrops color={'#01afef'} />
                            </List.Icon>
                        </List.Content>
                        <List.Content floated="left">
                            <List.Item style={{ fontSize: '15px' }}>
                                {`${props.data.rain} mm`}
                            </List.Item>
                        </List.Content>
                    </List.Item>
                </List>
            </Card.Content>
            {
                // CARD CONTENT TO REDIRECT TO FORECAST FOR THE NEXT 7 DAYS
            }
            {
                props.type === 'mobile'
                ?
                    <Card.Content
                        extra
                        textAlign="center"
                        style={{ backgroundColor: '#ffffff', height: '100px' }}
                    >
                        <p style={{ color: '#000000', fontSize: '12px', marginBottom: '2px', textAlign: 'center' }}>
                            PREVISÃO PARA O PERÍODO:
                        </p>              
                            <Button
                                basic
                                onClick={() => props.handleDash()}
                            >
                                {`${props.begin} - ${props.end}`}
                            </Button>                        
                    </Card.Content>
                :
                    ''
                }
        </Card>
    )
}

export default CurrentCard;