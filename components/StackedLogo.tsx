import { motion } from "framer-motion";
import { useState } from "react";

export default function StackedLogo({
  animated = false,
}: {
  animated?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!animated) {
    return (
      <div
        style={{
          position: "relative",
          width: 240,
          height: 240,
          margin: "0 auto",
        }}
      >
        <img
          src="/T.svg"
          alt="T"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <img
          src="/M.svg"
          alt="M"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <img
          src="/O.svg"
          alt="O"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "5%",
            width: "40%",
            height: "40%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: 500,
        height: 240,
        margin: "0 auto",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* T */}
        <motion.div
          animate={{
            x: isHovered ? "-83%" : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            left: "50%",
            top: 0,
            marginLeft: -120,
            zIndex: 2,
          }}
        >
          <img
            src="/T.svg"
            alt="T"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>

        {/* O */}
        <motion.div
          animate={{
            y: isHovered ? 30 : 55,
            scale: isHovered ? 0.6 : 0.4,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            left: "50%",
            top: 0,
            marginLeft: -120,
            zIndex: 3,
          }}
        >
          <img
            src="/O.svg"
            alt="O"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>

        {/* M */}
        <motion.div
          animate={{
            x: isHovered ? "83%" : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            left: "50%",
            top: 0,
            marginLeft: -120,
            zIndex: 1,
          }}
        >
          <img
            src="/M.svg"
            alt="M"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
