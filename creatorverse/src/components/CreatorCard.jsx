import React from "react";
import { Link } from "react-router-dom";
import styles from "./CreatorCard.module.css";

function CreatorCard({ creator }) {
  return (
    <div className={styles.card}>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} className={styles.image} />
      )}
      <h3 className={styles.name}>{creator.name}</h3>
      <p className={styles.description}>{creator.description}</p>
      <div className={styles.actions}>
        <a href={creator.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
          Visit Channel
        </a>
        <Link to={`/creator/${creator.id}`} className={styles.viewButton}>View Details</Link>
      </div>
    </div>
  );
}

export default CreatorCard;