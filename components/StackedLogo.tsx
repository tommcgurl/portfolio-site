import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./StackedLogo.module.css";

export default function StackedLogo({
  animated = false,
}: {
  animated?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  if (!animated) {
    return (
      <div className={styles.logoContainer}>
        <img
          src="/T.svg"
          alt="T"
          className={styles.letterImage}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <img
          src="/M.svg"
          alt="M"
          className={styles.letterImage}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <img
          src="/O.svg"
          alt="O"
          className={styles.oLetter}
        />
      </div>
    );
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={styles.animatedContainer}
    >
      <div className={styles.letterContainer}>
        {/* T */}
        <motion.div
          animate={{
            x: isHovered || isScrolled ? "-83%" : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={styles.letter}
          style={{
            zIndex: 2,
          }}
        >
          <img
            src="/T.svg"
            alt="T"
            className={styles.letterImage}
          />
        </motion.div>

        {/* O */}
        <motion.div
          animate={{
            y: isHovered || isScrolled ? 30 : 55,
            scale: isHovered || isScrolled ? 0.6 : 0.4,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={styles.letter}
          style={{
            zIndex: 3,
          }}
        >
          <img
            src="/O.svg"
            alt="O"
            className={ styles.oLetter}
          />
        </motion.div>

        {/* M */}
        <motion.div
          animate={{
            x: isHovered || isScrolled ? "83%" : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={styles.letter}
          style={{
            zIndex: 1,
          }}
        >
          <img
            src="/M.svg"
            alt="M"
            className={styles.letterImage}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
