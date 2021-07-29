import styles from "../styles/Upload.module.css";
import { FormEventHandler, useState, useRef } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

export default function Upload() {
  const [file, setFile] = useState<File>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(null);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUpload = useMutation(
    (formData: FormData) =>
      axios.post("/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) =>
          setUploadProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          ),
      }),
    { onSuccess: () => router.push("/") }
  );

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    videoUpload.mutate(formData);
  };

  return (
    <div className={styles.container} onSubmit={handleSubmit}>
      <form className={styles.form}>
        <fieldset>
          <legend>Upload Video</legend>
          <div className={styles.formInner}>
            <video
              className={file ? "" : styles.hidden}
              controls
              ref={videoRef}
            />
            <div>
              {uploadProgress ? (
                <div className={styles.uploadProgress}>
                  <label htmlFor="file">Uploading:</label>
                  <progress id="file" value={uploadProgress} max={100} />
                </div>
              ) : null}

              {videoUpload.isError && (
                <p>{videoUpload.error?.response.data.message}</p>
              )}
              <div className={styles.formTop}>
                <input
                  required
                  type="file"
                  accept=".mp4"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files[0];

                    if (!file) return;

                    setFile(file);
                    videoRef.current.src = URL.createObjectURL(file);
                  }}
                />
                <input
                  className={styles.title}
                  required
                  placeholder="Title"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className={styles.descriptionContainer}>
                <textarea
                  className={styles.description}
                  required
                  placeholder="Description"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <button type="submit" disabled={videoUpload.isLoading}>
                Upload
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
