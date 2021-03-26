
import React from 'react';
import {
    Card,
    Header,
    Image,
    Table
} from 'semantic-ui-react';
import {
    WiHumidity,
    WiRaindrops,
    WiStrongWind,
    WiThermometer
} from 'weather-icons-react';
import _ from 'lodash';

/**
 * @name Daily Card Accordion
 * @description Function to mount next 7 days weather forecast data card for desktop layout
 * @param {JSON} props Entry data
 * @returns {JSON} Current card component
 * @author Everson F. Feltrin
 * @since 2021-03-25
 */
const DailyCardTable = (props) => {
    return (
        // CARD TO SHOW WEATHER FORECAST NEXT 7 DAYS DATA
        < Card style ={{ backgroundColor: '#01afef', width: '100%'}}>
            <Card.Content 
                textAlign="center" 
                style={{ color: '#ffffff', backgroundColor: '#01afef', margin: '0px 0px'}}
            >                           
                <p style={{color: '#ffffff', fontSize: '15px', marginBottom: '0px'}}>
                    <strong>PREVISÃO METEOROLÓGICA PARA OS PRÓXIMOS 7 DIAS</strong>
                </p>
            </Card.Content>
            <Card.Content style={{ backgroundColor: '#ffffff', margin: '0px 0px' }}>
                {
                    props.data.length > 0
                    ?
                        // TABLE NEXT 7 DAYS DATA
                        <Table 
                            basic='very' 
                            celled 
                            collapsing 
                            style={{color: '#01afef'}}
                            textAlign="center" 
                        >
                            <Table.Header>
                                <Table.Row>
                                    {
                                        // TABLE HEADER
                                    }
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>
                                        <Header size='tiny'>
                                            <WiThermometer 
                                                color={'#01afef'} 
                                                size={45} 
                                            />
                                            <Header.Content size='tiny'>
                                                Temperatura do Ar
                                            </Header.Content>
                                        </Header>                                        
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Header size='tiny'>
                                            <WiHumidity 
                                                color={'#01afef'} 
                                                size={45} 
                                            />
                                            <Header.Content size='tiny'>
                                                Umidade Relativa do Ar
                                            </Header.Content>
                                        </Header>                          
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Header size='tiny'>
                                            <WiStrongWind 
                                                color={'#01afef'} 
                                                size={45} 
                                            />
                                            <Header.Content>
                                                Velocidade do Vento
                                            </Header.Content>
                                        </Header>                          
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Header size='tiny'>
                                            <WiRaindrops 
                                                color={'#01afef'} 
                                                size={45} 
                                            />
                                            <Header.Content size='tiny'>
                                                Volume de Chuva da Última Hora
                                            </Header.Content>
                                        </Header>                          
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                // TABLE BODY
                            }
                            <Table.Body>
                                {
                                    _.map(props.data, (obj, index) => (
                                        <Table.Row key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
                                            {
                                                // ICON AND DATE FOR SPECIFC DAY
                                            }
                                            <Table.Cell key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
                                                <Header 
                                                    as='h5' 
                                                    image
                                                >
                                                    <Image
                                                        rounded 
                                                        size='mini'
                                                        src={obj.groupIconUrl}
                                                    />
                                                    <Header.Content>
                                                        {_.split(obj.dt, ' ')[0]}
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            {
                                                // TEMP FOR SPECIFIC DAY
                                            }
                                            <Table.Cell key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>{`${obj.temp} ºC`}</Table.Cell>
                                            {
                                                // HUMIDITY FOR SPECIFIC DAY
                                            }
                                            <Table.Cell key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>{`${obj.humidity} %`}</Table.Cell>
                                            {
                                                // WIND SPEED FOR SPECIFIC DAY
                                            }
                                            <Table.Cell key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>{`${obj.windSpeed} m/s`}</Table.Cell>
                                            {
                                                // RAIN 1H FOR SPECIFIC DAY
                                            }
                                            <Table.Cell key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>{`${obj.rain} mm`}</Table.Cell>
                                        </Table.Row>
                                    ))
                                }                                            
                            </Table.Body>
                        </Table>
                    : 
                        ''
                }
            </Card.Content>
        </Card >
    );

};

export default DailyCardTable;