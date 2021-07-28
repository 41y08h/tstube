import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <a href="/api/login">Sign In</a>
      </header>
    </div>
  );
}
