import Image from 'next/image';
import styles from './ImageRow.module.css';

const ImageRow = ({ srcArray }) => {
  let containerClass = styles.imageContainer;
  if (srcArray.length === 1) {
    containerClass += ` ${styles.singleImage}`;
  } else if (srcArray.length === 2) {
    containerClass += ` ${styles.fewImages}`;
  }

  return (
    <div className={containerClass}>
      {srcArray.map((src, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image 
            src={src} 
            alt={`Image ${index + 1}`} 
            width={100} 
            height={66} 
            priority={index === 0}
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageRow;
