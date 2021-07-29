import Link from "next/link";
import { useAuth } from "../../contexts/Auth";
import styles from "./Header.module.css";

export default function Header() {
  const { isLoading, currentUser } = useAuth();

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>TsTube</h1>
        </a>
      </Link>
      <ul className={styles.headerList}>
        <li>
          <Link href="/upload">Upload</Link>
        </li>
        {isLoading ? null : (
          <li>
            {currentUser ? (
              <p>{currentUser.name}</p>
            ) : (
              <a href="/api/auth/login">Sign In</a>
            )}
          </li>
        )}
      </ul>
    </header>
  );
}
