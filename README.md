# Desarrollo Actividad

## 1. Aplicación del modelo de calidad ISO/IEC 25010

### Atributo seleccionado: 
*Usabilidad:* Es la capacidad del sistema para que personas reales logren sus objetivos de forma eficaz, eficiente y satisfactoria en un contexto de uso. Incluye que el usuario entienda qué puede hacer, aprenda rápido, controle la interfaz, cometa pocos errores (y se recupere fácil), y que la experiencia sea agradable y accesible.

sub atributos seleccionados:
- *Estetica UI:* La presentación visual ayuda a comprender y usar mejor: consistencia de estilos, jerarquía clara, espacios en blanco, tipografía legible y alineación. No es “bonito por bonito”: la estética apoya la comprensión.
- *Operabilidad:* Qué tan fácil es operar y controlar el sistema: navegación predecible, feedback inmediato, atajos, deshacer/rehacer, estados claros (cargando, error, éxito) y configuraciones simples.


### Requisitos No Funcionales
| *ID*                      | *EDU-RNF-USE-001*                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *Título*                  | Estética coherente de la interfaz (Design System + contraste)                                                                                                                                                                                                                                                                                                                                                      |
| *Descripción*             | La UI debe mantener consistencia visual en todas las pantallas mediante un Design System (tokens de color, tipografía, espaciado y estados) y asegurar legibilidad con relaciones de contraste adecuadas.                                                                                                                                                                                                          |
| *Prioridad*               | *Alta*                                                                                                                                                                                                                                                                                                                                                                                                           |
| *Categoría*               | No funcional – Usabilidad (Estética de la UI)                                                                                                                                                                                                                                                                                                                                                                      |
| *Fuente*                  | ISO/IEC 25010 + Stakeholders educativos                                                                                                                                                                                                                                                                                                                                                                            |
| *Criterios de Aceptación* | • 100% de pantallas usan tokens del Design System (tipografías, colores, espaciados y estados).<br>• Contraste mínimo: texto normal ≥ *4.5:1* y texto grande ≥ *3:1.<br>• Estados **hover/focus/active* visibles de forma consistente.<br>• Auditoría visual por muestra (≥10 pantallas por release) con *≥95% sin hallazgos críticos*.<br>• Se adjuntan capturas y reporte automatizado (axe/Lighthouse). |


| *ID*                      | *EDU-RNF-USE-002*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *Título*                  | Operabilidad: control por teclado y prevención de errores                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| *Descripción*             | Los usuarios deben poder completar los flujos clave solo con teclado, con foco visible y validaciones preventivas que reduzcan errores y den feedback claro.                                                                                                                                                                                                                                                                                                                                                                                                 |
| *Prioridad*               | *Alta*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| *Categoría*               | No funcional – Usabilidad (Operabilidad)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| *Fuente*                  | ISO/IEC 25010 + Stakeholders educativos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| *Criterios de Aceptación* | • Flujos clave (registro, login, recuperación, compra/inscripción) completables *solo con teclado: Tab/Shift+Tab/Enter/Espacio/Escape.<br>• **Foco visible* en todos los elementos interactivos; orden de tabulación lógico.<br>• Validación *en tiempo real* de formularios con mensajes claros y *aria-live* para errores.<br>• *Tasa de éxito ≥ 90%* y *≤ 1 error* promedio en pruebas de 5–8 usuarios por release; *tiempo < 2 min* por tarea.<br>• Sin “trampas de foco” (modales/menús); tamaño táctil ≥ *44×44 px* en vistas móviles. |



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| *Criterios de Aceptación* | • Cumplimiento *WCAG 2.1 AA* en las vistas definidas; *0 hallazgos críticos* y *0–2 serios* con ticket creado en auditorías axe/Pa11y/Lighthouse.<br>• Roles ARIA, *nombre accesible* y labels correctos en todos los controles; regiones <main>, <nav> y encabezados semánticos.<br>• Lectores de pantalla (NVDA/JAWS/VoiceOver) narran correctamente 3 flujos clave (orden, propósito y estado); *0 bloqueantes.<br>• Interfaz usable en **320px* y con *zoom 200%* sin pérdida de funcionalidad ni solapamientos.<br>• Evidencias adjuntas: reportes automatizados, checklist manual, videos breves (teclado y lector de pantalla). |





## 2. Definición de métricas y criterios de aceptación  
*ISO/IEC 25010 → Usabilidad*  
*Subatributos:* *Estética UI* y *Operabilidad*  
*Ámbito:* Módulos de *Matemáticas/Geometría, **Ciencias Naturales* y *Tecnología*.

### 2.1 Métricas (transversales a los 3 módulos)
| Métrica | Cómo se mide | Umbral |
|---|---|---|
| *Consistencia visual* (tokens: color/tipo/espaciado/estados) | Auditoría de 8–10 pantallas contra un mini Design System | *≥95%* sin hallazgos críticos |
| *Contraste* | Verificación de contraste en textos/controles | Texto normal *≥4.5:1, texto grande **≥3:1* |
| *Foco visible* | Revisión manual en todos los elementos interactivos | *100%* con foco visible y orden lógico |
| *Cobertura de teclado* | Completar flujos con Tab/Shift+Tab/Enter/Espacio/Escape | *100%* de pasos navegables; sin trampas de foco |
| *Tiempo por tarea* | Cronometrar 3 tareas por módulo | *≤2 min* promedio (n=5) |
| *Errores por tarea* | Contar errores/retrocesos y claridad de mensajes | *≤1* error promedio |
| *Feedback inmediato* | Latencia visual al cambiar controles | *<200 ms* por acción clave |

### 2.2 Criterios de aceptación por módulo

#### A) Matemáticas / Geometría
- *Exploración 3D:* cambiar *forma/color/escala* con mouse *y* teclado; ayuda visible (“Rota/Zoom; Tab para controles”); estados hover/focus/active consistentes.  
- *Descomposición:* toggles accesibles para *caras/aristas/vértices; **conteos correctos* (cubo: *6/12/8*); estilos diferenciados (caras semitransparentes, aristas marcadas, vértices destacados).  
- *Simetría:* selector mariposa/estrella + toggle de ejes sin trampas de foco; ejes con estilo coherente.  
- *Fracciones 3D (pizza):* sliders *denominador 2–12* y *numerador 0–den* (validación); muestra *fracción, decimal y %; actualización **<200 ms*.

#### B) Ciencias Naturales
- *Ciclo del agua:* slider de *temperatura* activa evaporación/condensación/precipitación; labels claros; foco visible.  
- *Modelo 3D del paisaje:* rotar/zoom y hotspots con texto breve; estados de activo/seleccionado distinguibles.  
- *Decisiones sostenibles:* botones accesibles; feedback inmediato; opción de deshacer.  
- *Video con subtítulos:* controles nativos; pista .vtt activable; texto de ayuda.

#### C) Tecnología (Pensamiento Lógico / Algoritmos)
- *Editor de bloques:* operar con mouse *y* teclado (selección/orden); foco visible en bloque activo.  
- *Ejecución del algoritmo:* feedback inmediato (trayectoria); botón *Reiniciar* visible.  
- *Validación de entradas:* previene secuencias inválidas con mensajes claros; sin bloqueos de foco.  
- *Estados de sistema:* éxito/error mostrados en <200 ms; jerarquía visual clara.

### 2.3 Definition of Done (DoD) – Usabilidad
- [ ] *Estética UI:* tokens aplicados en pantallas clave; contraste cumple umbrales.  
- [ ] *Operabilidad:* navegación *solo con teclado* en los 3 módulos; foco visible y orden lógico.  
- [ ] *Eficiencia:* tiempos por tarea *≤2 min* y errores *≤1* (muestra n=5).  
- [ ] *Feedback:* acciones clave responden en *<200 ms* en todas las vistas.




## 3. Implementar funcionalidades del frontend

*Stack:* React + Vite (TS), react-router-dom, Three.js (@react-three/fiber + @react-three/drei).  
*Ámbito:* Módulos de *Matemáticas/Geometría, **Ciencias Naturales* y *Tecnología*.

### 3.1 Rutas principales
| Ruta | Vista | Descripción |
|---|---|---|
| /mat/shapes | *ShapeExplorer* | Explorar formas 3D (rotación, zoom, cambio de forma/color/escala). |
| /mat/decomposer | *PolyhedronDecomposer* | Mostrar/ocultar *caras/aristas/vértices* y conteos (cubo 6/12/8). |
| /mat/symmetry | *SymmetryLab* | Simetría *bilateral* (mariposa) y *radial* (estrella) con ejes. |
| /mat/fractions | *FractionPizza* | Fracciones en 3D (pizza): sliders *denominador 2–12* y *numerador 0–den*. |            
| /nat/ciclo | *WaterCycle* | Ciclo del agua: slider de *temperatura* activa estados (evap./cond./precip.). |
| /tec/algoritmos | *BlockAlgorithms* | Secuencias/bucles con bloques y ejecución visual (robot). |

> El *Sidebar* incluye la sección Matemáticas/Geometría con enlaces a las 4 vistas.

### 3.2 Componentes clave
- SceneCanvas: contenedor reusable para escenas 3D con *OrbitControls*, luz y tamaño fijo.
- MediaPlayer: reproductor de video con subtítulos *.vtt* y detección de completado.
- Quiz: opción múltiple con feedback inmediato.
- Progress: persistencia simple en localStorage para marcar video/3D/quiz completados.
- Controles accesibles: select, checkbox, range con *labels* y *foco visible*.

### 3.3 Flujos de usuario (resumen)
1. *Seleccionar tema* desde el Sidebar → se abre la vista.  
2. *Interactuar* (3D, sliders, toggles, bloques) con mouse *y* teclado.  
3. *Feedback inmediato* (<200 ms) y estilos consistentes (tokens de color/tipo/espaciado).  
4. (Opcional) *Video corto* con subtítulos.  
5. *Progreso* se guarda localmente.

### 3.4 Alineación a ISO/IEC 25010 (Usabilidad)
- *Estética UI:* tokens de diseño aplicados, contraste texto normal *≥4.5:1* / grande *≥3:1*, estados hover/focus/active coherentes.
- *Operabilidad:* navegación *solo con teclado* (Tab/Shift+Tab/Enter/Espacio/Escape), *foco visible* y orden lógico; sin trampas de foco.

### 3.5 Criterios de aceptación (frontend)
- *Exploración 3D:* cambiar *forma/color/escala*; ayuda “Rota/Zoom; Tab para controles”.  
- *Descomposición:* toggles accesibles; *conteos correctos* (6/12/8); estilos diferenciados.  
- *Simetría:* selector mariposa/estrella + ejes; foco visible en controles.  
- *Fracciones 3D:* sliders con límites (*2–12* y *0–den); muestra **fracción, decimal y %; actualización **<200 ms*.  
- *Naturales (Ciclo del agua):* slider de temperatura activa fases; hotspots con texto breve.  
- *Tecnología (Algoritmos):* edición/ejecución de bloques; botón *Reiniciar*.  
- *Accesibilidad y teclado:* 100% de controles navegables; labels correctos.  
- *Rendimiento base:* LCP en Home/Listado *≤ 2.5 s* (dev/preview).

### 3.6 Definition of Done (DoD)
- [ ] Rutas y navegación funcionando (incluye Sidebar).  
- [ ] Controles con *labels* y *foco visible*; flujos completables con teclado.  
- [ ] Tokens de diseño aplicados y *contraste* por encima de los umbrales.  
- [ ] Interacciones clave responden *<200 ms*.  
- [ ] Progreso almacenado en localStorage (si aplica).




## 4 Punto

## 5 Punto

## 6 Punto