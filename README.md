# 📦 Registro de Horas y Viajes — Sistema de Gestión Laboral

Aplicación **full-stack** para el registro y control de **horas trabajadas** y **viajes realizados**, con **cálculo automático de importes** según la **lógica de negocio definida por cada empresa**.

El sistema está pensado para **uso real en campo**, optimizado para **dispositivos móviles**, con una arquitectura clara y escalable que separa **frontend**, **backend** y **reglas de negocio**.

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación
- Registro de usuarios
- Login con **JWT**
- Rutas protegidas
- Asociación automática del usuario a una empresa

---

### 🏢 Empresas
Cada empresa define su **lógica de negocio**, por ejemplo:
- Precio por viaje
- Precio por metro cúbico
- Pago por horas / viajes
- Moneda

Ejemplo real (Empresa: *Vial Jaime*):
- **$8.000 por viaje**
- **$800 por metro cúbico**

---

### 🚚 Viajes
- Carga de viajes con:
  - Remito
  - Metros cúbicos
  - Fecha
- Historial de viajes:
  - Fecha
  - Remito
  - Metros
  - **Importe calculado**
- Vista optimizada para celular (máx. 480px)
- Una sola línea por viaje para lectura rápida

---

### ⏱️ Horas
- Registro de horas trabajadas
- Cálculo automático:
  - hasta **8 hs normales**
  - **horas extra** separadas
- Edición y eliminación de registros

---

### 📊 Resumen mensual
- Resumen por **mes y año**
- Totales de:
  - Viajes
  - Horas
  - Importe
- Manejo correcto de períodos sin datos

---

## 🧠 Lógica de negocio

La lógica de negocio **no está hardcodeada en el frontend**:

- Las **empresas definen cómo se paga**
- El backend aplica reglas (horas normales / extra)
- El frontend **respeta esas reglas**
- El resumen mensual consolida todos los datos

Esto permite:
- múltiples empresas
- distintas reglas de pago
- escalabilidad real

---

## 🖥️ Tecnologías utilizadas

### Frontend
- React
- React Router
- Context API
- Vite
- CSS puro (mobile-first)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 📱 Diseño (UX / UI)

- Mobile-first
- Máximo 480px para listas
- Sin tablas (mejor legibilidad en celular)
- Estética oscura profesional
- Inputs grandes, pensados para uso en campo

---

## 📂 Estructura del proyecto

```text
backend/
 ├─ controllers/
 ├─ models/
 ├─ routes/
 ├─ services/
 └─ index.js

frontend/
 ├─ pages/
 │   ├─ Login.jsx
 │   ├─ Register.jsx
 │   ├─ Trips.jsx
 │   ├─ HistoryTrips.jsx
 │   ├─ Hours.jsx
 │   └─ Summary.jsx
 ├─ components/
 │   └─ Navbar.jsx
 ├─ context/
 ├─ api/
 └─ styles/
