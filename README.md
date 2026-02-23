# Challenge-NG // Santiago Ezequiel Sanchez

## Cómo correr la aplicación

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir el navegador en la URL que indica Vite (por defecto `http://localhost:5173` o el puerto que se muestre en consola).

## Resumen de la solución

La app está hecha en React usando Vite y se apoya fuerte en las llamadas a la API que da el challenge:

- Primero se pide el **email** del candidato y se llama a `GET /api/candidate/get-by-email?email=...` para traer `uuid`, `candidateId` y `applicationId`.  
- Con esos datos en memoria, se consulta la lista de posiciones con `GET /api/jobs/get-list` y se muestran en pantalla, cada una con su input para el link del repositorio.  
- Cuando el usuario hace clic en **Enviar** para una posición, se manda la postulación con `POST /api/candidate/apply-to-job`, enviando en el body `uuid`, `candidateId`, `applicationId`, `jobId` y la `repoUrl`.  
- En toda la app se manejan estados de **carga**, **error** y **éxito** de forma simple y visible en la UI, priorizando que se entienda qué está pasando con cada request.  
