import env from '../config/env';

/**
 * @name Call Weather Map Api
 * @description Get data in open weather map api
 * @param {String} lat User latitude
 * @param {String} lon User longitude
 * @returns {JSON} Data from OpenWeather
 * @author Everson F. Feltrin
 * @since 2021-03-21
 */
const callWeatherMapApi = (lat, lon) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(`${env.urlApi}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&lang=pt_br&units=metric&appid=${env.apiKey}`, requestOptions)
        .then(response => {
            if(response.status === 200) return response.json();
            
            return {error: true, status: response.status};
        });   
}

export default callWeatherMapApi;