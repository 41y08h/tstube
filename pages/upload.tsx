import styles from "../styles/Upload.module.css";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File>(null);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <fieldset>
          <legend>Upload Video</legend>
          <div className={styles.formInner}>
            {file && (
              <video controls autoPlay src={URL.createObjectURL(file)} />
            )}
            <div>
              <div className={styles.formTop}>
                <input
                  required
                  type="file"
                  accept=".mp4"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
                <input className={styles.title} required placeholder="Title" />
              </div>
              <div className={styles.descriptionContainer}>
                <textarea
                  className={styles.description}
                  required
                  placeholder="Description"
                />
              </div>
              <button type="submit">Upload</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
