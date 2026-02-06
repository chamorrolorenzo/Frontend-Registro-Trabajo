export default function Help() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>📘 Guía rápida — Registro-Trabajo</h1>

      <p>
        Bienvenido/a a <b>Registro-Trabajo</b>.  
        Esta aplicación sirve para registrar viajes, metros cubicos transportados y llevar
        control de la actividad diaria.
      </p>

      <hr />

      <h2>🔐 Iniciar sesión</h2>
      <ol>
        <li>Ingresá tu usuario y contraseña.</li>
        <li>Presioná Login.</li>
        <li>Si los datos son correctos, entrás al sistema.</li>
      </ol>

      <p><b>⚠️ No compartas tu contraseña.</b></p>

      <hr />

      <h2>🚚 Cargar un viaje</h2>
      <ol>
        <li>Tocá “Nuevo viaje”.</li>
        <li>Completá:</li>
        <ul>
          <li>remito</li>
          <li>Metros</li>
          
        </ul>
        <li>Presioná Guardar.</li>
      </ol>

      <p>
        Antes de guardar verás:
        <br />
        <i>“Vas a gusrdar remito xxx con XX metros — ¿estás seguro?”</i>
      </p>

      <hr />

      <h2>📊 Ver registros</h2>
      <ul>
        <li>Viajes cargados</li>
        <li>Metros totales</li>
        <li>Historial por fecha</li>
      </ul>

      <hr />

      <h2>👷 Permisos</h2>

      <h3>Empleado</h3>
      <ul>
        <li>✅ Cargar viajes</li>
        <li>✅ Ver registros</li>
        <li>❌ Borrar datos</li>
      </ul>

      <h3>Administrador</h3>
      <ul>
        <li>✅ Todo lo anterior</li>
        <li>✅ Ver datos globales</li>
        <li>✅ Gestión del sistema</li>
      </ul>

      <hr />

      <h2>🚪 Cerrar sesión</h2>
      <p>Usá “Cerrar sesión” al terminar, sobre todo en computadoras compartidas.</p>

      <hr />

      <h2>⚠️ Recomendaciones</h2>
      <ul>
        <li>Revisá antes de guardar.</li>
        <li>No cierres el navegador mientras cargás.</li>
        <li>Si algo falla, presioná F5.</li>
      </ul>

      <hr />

      <h2>🆘 Problemas comunes</h2>

      <p><b>No puedo entrar</b><br />Revisá usuario y contraseña.</p>
      <p><b>No se guardó un viaje</b><br />Verificá campos completos.</p>
      <p><b>Pantalla blanca</b><br />Refrescá la página.</p>

      <hr />

      <p>
        Para ayuda adicional, contactá al administrador del sistema.
      </p>
    </div>
  );
}
