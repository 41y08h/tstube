import { useAuth } from "../contexts/Auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isLoading, currentUser } = useAuth();
  return (
    <div>
      <header className={styles.header}>
        {isLoading ? null : currentUser ? (
          <p>{currentUser.name}</p>
        ) : (
          <a href="/api/auth/login">Sign In</a>
        )}
      </header>
    </div>
  );
}
