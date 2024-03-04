const Header = () => {
  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flex: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#AA1415",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://sistemaseducaciononline.uta.edu.ec/pluginfile.php/1/theme_adaptable/adaptablemarkettingimages/0/logo_uta.png"
          alt="Logo UTA"
          style={{ width: "50px" }}
        />
        <h6 style={{ color: "white", marginLeft: "15px", marginTop: "5px" }}>
          UNIVERSIDAD TÉCNICA DE AMBATO
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          flex: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  );
};

export default Header;
