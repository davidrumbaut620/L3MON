const { exec } = require("child_process");
const os = require("os");

const checkJava = () => {
  exec("java -version", (error, stdout, stderr) => {
    if (!error) {
      console.log("✅ Java ya está instalado.");
      return;
    }

    console.log("🔍 Java no está instalado. Procediendo con la instalación...");
    installJava();
  });
};

const installJava = () => {
  let command;

  if (os.platform() === "win32") {
    command = "winget install --id=Microsoft.OpenJDK.8";
  } else if (os.platform() === "darwin") {
    command = "brew install openjdk@8";
  } else {
    command = "sudo apt update && sudo apt install -y openjdk-8-jdk";
  }

  console.log(`🚀 Instalando Java con: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error al instalar Java: ${error.message}`);
      return;
    }
    console.log("✅ Java 8 instalado correctamente.");
  });
};

// Ejecutar la verificación
checkJava();
