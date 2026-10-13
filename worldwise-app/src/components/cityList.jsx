import styles from './CityList.module.css'
import CityItem from './cityItem';
import Spinner from './Spinner'
function CityList({cities,isLoading})
{
    if(isLoading) return <Spinner/>
    return <ul className={styles.cityList}>
        {cities.map(city=>{
            return <CityItem city={city} key={city.id}/>
        })}
    </ul>
}
export default CityList;