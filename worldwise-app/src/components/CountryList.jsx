import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList({ cities, isLoading }) {

    console.log("danan",cities)
  if (isLoading) return <Spinner />;

  if (cities.length == 0) return <Message />;

  const countryItem = cities.reduce((arr, curr) => {
    if (!arr.map((el) => el.country).includes(curr.country))
    {
         return [...arr, { country: curr.country, emoji: curr.emoji }];
    }
    else return [...arr]
     
  }, []);
  return (
    <ul className={styles.countryList}>
      {countryItem.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}
export default CountryList;
