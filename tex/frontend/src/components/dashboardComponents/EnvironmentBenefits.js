import React from "react";

function EnvironmentBenefits() {
  return (
    <div
      className="activity"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h3>Environmental Benefits</h3>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={require("../../assets/images/co2.png")}
          alt="emission"
          width={100}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>
            CO<sub>2</sub> Emissions Saved
          </p>
          <p>
            <b>7696636 KG (static data)</b>
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={require("../../assets/images/trees.png")}
          alt="trees"
          width={100}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>Equivalent Trees Planted</p>
          <p>
            <b>22972 (static data)</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EnvironmentBenefits;
