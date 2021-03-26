import React from 'react';
import{
    Accordion,
    Button,
    Card,
    Icon,
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
 * @name Daily Card Accordion
 * @description Function to mount next 7 days weather forecast data card for mobile layout
 * @param {JSON} props Entry data
 * @returns {JSON} Current card component
 * @author Everson F. Feltrin
 * @since 2021-03-25
 */
const DailyCardAccordion = (props) => {
    // ACCORDION INDEX
    const [activeIndex, setActiveIndex] = React.useState(0);

    // HANDLE CHANGE ACCORDION INDEX
    const handleChangeActiveIndex = (index) => setActiveIndex(activeIndex === index ? -1 : index);

    // HANDLE CHANGE TO CURRENT DASH
    const handleChangeDash = () => {
        setActiveIndex(0);

        return props.handleDash();
    }

    return (
        // CARD TO SHOW NEXT 7 DAYS DATA
        <Card style={{ backgroundColor: '#01afef', marginBottom: '0px'}}>
            {
                // CARD CONTENT TO SHOW NEXT 7 DAYS DATA HEADER
            }
            <Card.Content
                style={{ backgroundColor: '#01afef' }}
                textAlign="center"
            >
                <p style={{ color: '#ffffff', fontSize: '16px', marginBottom: '0px' }}>
                    <strong>PREVISÃO METEREOLÓGICA PARA OS PRÓXIMOS 7 DIAS</strong>
                </p>
            </Card.Content>
            {
                // CARD CONTENT TO SHOW NEXT 7 DAYS DATA
            }
            <Card.Content
                style={{ backgroundColor: '#ffffff' }}
                textAlign="center"
            >
                <Accordion
                    style={{ color: '#01afef' }}
                    styled
                >
                    {
                        _.map(props.data, (obj, index) => (
                            [
                                <Accordion.Title
                                    key={`acc_tit_${index}`}
                                    active={activeIndex === index}
                                    index={index}
                                    onClick={() => handleChangeActiveIndex(index)}
                                >
                                    {
                                        // ICON AND DATE FOR SPECIFC DAY
                                    }
                                    <Icon name='dropdown' />
                                    {obj.dt}
                                    <Image
                                        centered
                                        size='mini'
                                        src={obj.groupIconUrl}
                                        verticalAlign='middle'
                                    />
                                </Accordion.Title>,
                                <Accordion.Content key={`acc_cont_${index}`} active={activeIndex === index}>
                                    <List
                                        key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}
                                        celled
                                        size='mini'
                                        verticalAlign='middle'
                                    >
                                        {
                                            // TEMP FOR SPECIFIC DAY
                                        }
                                        <List.Item key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
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
                                                    {`${obj.temp} ºC`}
                                                </List.Item>
                                            </List.Content>
                                        </List.Item>
                                        {
                                            // HUMIDITY FOR SPECIFIC DAY
                                        }
                                        <List.Item key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
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
                                                    {`${obj.humidity} %`}
                                                </List.Item>
                                            </List.Content>
                                        </List.Item>
                                        {
                                            // WIND SPEED FOR SPECIFIC DAY
                                        }
                                        <List.Item key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
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
                                                    {`${obj.windSpeed} m/s`}
                                                </List.Item>
                                            </List.Content>
                                        </List.Item>
                                        {
                                            // RAIN 1H FOR SPECIFIC DAY
                                        }
                                        <List.Item key={`${index}_${Math.floor(Math.random() * 99999999999 + 1)}`}>
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
                                                    {`${obj.rain} mm`}
                                                </List.Item>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Accordion.Content>
                            ]
                        ))
                    }
                </Accordion>
            </Card.Content>
            {
                // CARD CONTENT TO REDIRECT TO FORECAST FOR REAL TIME
            }
            <Card.Content
                extra
                style={{ backgroundColor: '#ffffff' }}
                textAlign="center"
            >
                <Button
                    basic
                    onClick={() => handleChangeDash()}
                >
                    <Icon name='undo' />
                        voltar
                    </Button>
            </Card.Content>
        </Card>
    );
};

export default DailyCardAccordion;
