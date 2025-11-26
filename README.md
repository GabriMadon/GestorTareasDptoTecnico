# Gestor de Tareas - Departamento Técnico

## 📋 Descripción
El **Gestor de Tareas del Departamento Técnico** es una aplicación web diseñada para registrar y dar seguimiento al ingreso de equipos que requieren diagnóstico o reparación.  
Su objetivo es centralizar la información de clientes y equipos, facilitando la gestión del flujo de trabajo técnico desde la recepción hasta la solución del problema.

## 🎯 Problema que resuelve
En muchos departamentos técnicos, el registro de equipos se realiza de forma manual o dispersa (hojas de cálculo, notas, correos). Esto genera:
- Pérdida de información importante (datos del cliente, número de serie, descripción del problema).
- Dificultad para dar seguimiento a las prioridades de cada caso.
- Procesos poco claros para técnicos y clientes.

El **Gestor de Tareas** resuelve estos problemas al ofrecer:
- Un formulario moderno y accesible para registrar cada ingreso.
- Organización clara de los datos del cliente y del equipo.
- Campos estructurados para tipo de equipo, marca, modelo, año y número de serie.
- Registro de la descripción del problema y asignación de prioridad.
- Base para implementar trazabilidad y seguimiento de cada HU (Historia de Usuario) en GitHub Projects.

## 🚀 Funcionalidades actuales
- Formulario de ingreso dividido en dos secciones:
  - **Datos del Cliente**: nombre, teléfono, correo electrónico.
  - **Datos del Equipo**: tipo de equipo, marca, modelo, año, número de serie, descripción del problema, prioridad.
- Validaciones básicas con `required` y tipos de input (`email`, `tel`, `number`).
- Diseño moderno con **Google Fonts (Roboto)**, espaciado uniforme y estilos accesibles.
- Botón de acción principal: **Registrar Ingreso**.

## 🛠️ Tecnologías utilizadas
- **HTML5** para la estructura del formulario.
- **CSS3** (Flexbox, gap, estilos modernos).
- **JavaScript (app.js)** para validaciones y lógica futura.
- **GitHub Projects** para la gestión ágil de Historias de Usuario.

---

## 📄 Licencia
Este proyecto es de uso académico y profesional como parte del portafolio de desarrollo de software de Gabriel Hurtado Maldonado.
