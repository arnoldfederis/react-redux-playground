import { useEffect, useState } from 'react'

const Weather = () => {
  const apiKey = '3ebaa4f45ab0b1369b02fb29e14044a5'
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const [zipCode, setZipCode] = useState(10001)
  const [temp, setTemp] = useState(0)
  const [recommendation1, setRecommendation1] = useState('')
  const [recommendation2, setRecommendation2] = useState('')

  const [forms, setForms] = useState({
    city1: '',
    city2: '',
    country1: '',
    country2: ''
  })

  useEffect(() => {

    const array = [
      {
        name: 'test1'
      },
      {
        name: 'test2'
      },
      {
        name: 'test3'
      },
      {
        name: 'test4'
      }
    ]

    const hello = array.map(data => data.name).join(', ')
    console.log(hello, 'hehehe')
  }, [])

  const [humidity1, setHumidity1] = useState(0)
  const [humidity2, setHumidity2] = useState(0)

  const handleSelectCity = (e) => {
    setCity(e.target.value)
  }

  const handleSelectZipCode = (e) => {
    setZipCode(e.target.value)
  }

  const handleComparisonFormChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const getWeather = (e) => {
    e.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ weather }) => {
        if (weather && weather.length > 0) {
          setWeather(weather[0].main)
          switch (weather[0].main) {
            case 'Clear':
              setRecommendation('You should not bring anything')
              break
            case 'Clouds':
              setRecommendation('You should bring a cap')
              break
            case 'Rain':
              setRecommendation('You should bring an umbrella')
              break
            default:
              setRecommendation('Unknown weather, stay home!')
          }
        }
      })
  }

  const getZipcode = (e) => {
    e.preventDefault()

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zipCode},us&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ main }) => {
        let celciusTemp = Math.round(main.temp - 273.15)
        setTemp(celciusTemp)

        if (celciusTemp > 40) {
          setRecommendation1('You should bring a jacket')
        } else if (celciusTemp <= 40 && celciusTemp >= 20) {
          setRecommendation1('Do not wear long sleeves')
        } else if (celciusTemp <= 20 && celciusTemp >= -10) {
          setRecommendation1('Wear a coat')
        } else {
          setRecommendation1('Unknown weather, stay home!')
        }
      })
      .catch(() => setRecommendation1('Error is getting data'))
  }

  const getCityComparison = (e) => {
    e.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${forms.city1},${forms.country1}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ main }) => {
        setHumidity1(main.humidity)
      })

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${forms.city2},${forms.country2}&appid=${apiKey}`)
      .then(res => res.json())
      .then(({ main }) => {
        setHumidity2(main.humidity)
      })

    if (humidity1 > humidity2) {
      setRecommendation2(`${forms.country1} is more humid than ${forms.country2} by ${humidity1 - humidity2}`)
    } else if (humidity1 < humidity2) {
      setRecommendation2(`${forms.country2} is more humid than ${forms.country1} by ${humidity2 - humidity1}`)
    } else {
      setRecommendation2('Both cities are equally humid')
    }
  }

  return (
    <>
      <h1>Scene 1 - Weather</h1>
      <form onSubmit={getWeather}>
        <select name="city" onChange={handleSelectCity}>
          <option hidden value="" />
          <option value="Manila">
            Manila
          </option>
          <option value="Cebu">
            Cebu
          </option>
          <option value="Sydney">
            Sydney
          </option>
        </select>

        <button onClick={getWeather}>Get Recommendation</button>

        {weather && (
          <>
            <p>Weather: {weather}</p>
            <p>Recommendation: {recommendation}</p>
          </>
        )}
      </form>

      <hr />

      <h1>Scene 2 - Zip</h1>
      <form onSubmit={getZipcode}>
        <input type="text" name="zipcode" onChange={handleSelectZipCode} />
        <div>
          <button onClick={getZipcode}>Get Temperature</button>
        </div>

        {temp !== 0 && (
          <>
            <h2>Temperature: {temp}</h2>
            <p>Recommendation: {recommendation1}</p>
          </>
        )}
      </form>

      <hr />

      <h1>Scene 3 - Comparison</h1>
      <form onSubmit={getCityComparison}>
        <p>First City</p>
        <input type="text" name="city1" required onChange={handleComparisonFormChange} />
        <p>First Country</p>
        <input type="text" name="country1" required onChange={handleComparisonFormChange} />
        <p>Second City</p>
        <input type="text" name="city2" required onChange={handleComparisonFormChange} />
        <p>Second Country</p>
        <input type="text" name="country2" required onChange={handleComparisonFormChange} />
        <div>
          <button type="submit" onClick={getCityComparison}>Get Temperature</button>
        </div>

        {recommendation2 !== '' && (
          <>
            <p>Recommendation: {recommendation2}</p>
          </>
        )}
      </form>
    </>
  )
}

export default Weather
