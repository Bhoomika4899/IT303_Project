import React from "react";

const Student2 = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#E5E7EB",
      }}
    >
      <div
        style={{
          backgroundColor: "#F3F4F6",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#EF4444",
          }}
        >
          Marks Not Entered Yet
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "16px" }}>
          The guide and/or examiner have not entered the marks yet. Please check
          back later.
        </p>
      </div>
    </div>
  );
};

export default Student2;
