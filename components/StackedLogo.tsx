import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ scale: { duration: 0.3 } }}
      className="cursor-pointer"
      style={{
        position: "relative",
        width: 500,
        height: 240,
        margin: "0 auto",
      }}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          // Stacked logo (shown when not hovered)
          <motion.div
            key="stacked"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              width: "240px",
              height: "240px",
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
          </motion.div>
        ) : (
          // Separated T-O-M letters (shown when hovered)
          <motion.div
            key="separated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              style={{ width: "30%", height: "100%" }}
            >
              <img
                src="/T.svg"
                alt="T"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              style={{ width: "30%", height: "100%" }}
            >
              <img
                src="/O.svg"
                alt="O"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              style={{ width: "30%", height: "100%" }}
            >
              <img
                src="/M.svg"
                alt="M"
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
