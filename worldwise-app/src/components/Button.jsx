import styles from "./Button.module.css";
function Button({ className, type, children }) {
    return <button className={`${styles.btn} ${styles[type]} ${className}`}>{children}</button>;
}
export default Button;