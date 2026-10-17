import styles from './CityList.module.css'
import CityItem from './cityItem';
import Spinner from './Spinner'
function CityList({cities,isLoading})
{
    if(isLoading) return <Spinner/>

    if(cities.length==0) return <h1>No city found</h1>
    return <ul className={styles.cityList}>
        {cities.map(city=>{
            return <CityItem city={city} key={city.id}/>
        })}
    </ul>
}
export default CityList;