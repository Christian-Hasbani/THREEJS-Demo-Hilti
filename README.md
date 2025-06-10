# Hilti 3D Model Integration

## 🎯 Objective

Integrate a **Hilti drill screw** 3D model into our web application using **Three.js**, by rendering a 3D model (.glb) converted from Hilti’s official CAD files.

---

## 📦 Prerequisites

- A working **Three.js** scene with `GLTFLoader`
- Access to [Hilti CadClick Portal](https://hilti.cadclick.com)
- Basic Node.js development environment

---

## 🧩 Step-by-Step Integration

### 1. 🔎 Locate the Product CAD Model

- Go to 👉 [https://hilti.cadclick.com](https://hilti.cadclick.com)
- Search for the required product (e.g., drill screw)
- Select the product and choose the **3D CAD** tab
- Download the **STEP (.stp)** format (preferred for high-quality 3D)

---

### 2. 🔁 Convert STEP to glTF / glb

#### Option: 🌐 Online Conversion Tool (Used in this project)

- Use the online converter at [https://blackthread.io/gltf-converter/](https://imagetostl.com/convert/file/stp/to/gltf)
- Upload the downloaded `.stp` file
- Download the converted `.gltf` file for use in the app

*This method was chosen for simplicity and speed without needing additional software.*

---

### 3. 📁 Add the Model to the App

- Place the `.glb` file inside your app’s `/public/models/` folder.
- Example folder structure:

