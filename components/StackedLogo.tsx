export default function StackedLogo() {
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
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
