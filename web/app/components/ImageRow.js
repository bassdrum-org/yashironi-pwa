import Image from 'next/image';
import styles from './ImageRow.module.css';

const ImageRow = ({ src1, src2, src3 }) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <Image src={src1} alt="Image 1" layout="responsive" width={100} height={66} />
      </div>
      <div className={styles.imageWrapper}>
        <Image src={src2} alt="Image 2" layout="responsive" width={100} height={66} />
      </div>
      <div className={styles.imageWrapper}>
        <Image src={src3} alt="Image 3" layout="responsive" width={100} height={66} />
      </div>
    </div>
  );
};

export default ImageRow;
