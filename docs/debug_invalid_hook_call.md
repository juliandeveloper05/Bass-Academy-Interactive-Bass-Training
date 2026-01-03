# 🔍 Análisis del Bug "Invalid Hook Call"

## Descripción General del Problema

El error **"Invalid hook call"** en React es un error crítico que crashea la aplicación completamente, mostrando una pantalla blanca o un overlay de error.

---

## Causas Comunes del Error

El error "Invalid hook call" generalmente ocurre por **una de estas tres causas**:

| # | Causa | Descripción |
|---|-------|-------------|
| 1 | **Hooks fuera del top-level** | Hooks llamados fuera del nivel superior de un componente funcional |
| 2 | **Hooks en condiciones** | Hooks llamados dentro de `if`, loops, o funciones anidadas |
| 3 | **Múltiples versiones de React** | El proyecto tiene más de una copia de React instalada |

---

## Análisis del Código

### Archivos Revisados

- `App.jsx`
- `HomeScreen.jsx`

### Estado Actual del Código

El código está **estructurado correctamente**:

- Los hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) están en el top-level del componente `BassTrainer`
- La navegación condicional (líneas 269-460) usa renderizado condicional apropiado
- No hay hooks dentro de condiciones o loops

---

## El Problema Real Identificado

Basado en el historial de debugging, el bug estaba relacionado con:

### 1. localStorage Persistiendo Estado de Navegación

```javascript
// ❌ PROBLEMA: Estado persistido que causaba problemas
const [currentScreen, setCurrentScreen] = useState(() => {
  return localStorage.getItem('currentScreen') || 'home';
});
```

### 2. Estado Inconsistente al Recargar

- Al iniciar, la app intentaba ir a `"exercise"` sin tener `selectedArtist` configurado
- Esto causaba que componentes recibieran `undefined` en props críticos

### 3. Posible undefined en Props

Si `selectedArtist` era `null` pero la pantalla era `"exercise"`, causaba problemas al renderizar componentes dependientes.

---

## La Solución Aplicada

```javascript
// ✅ CORRECTO: Siempre iniciar en 'home'
const [currentScreen, setCurrentScreen] = useState('home');
const [selectedArtist, setSelectedArtist] = useState(null);
```

### Cambios Clave

1. **Eliminar persistencia de `currentScreen`** en localStorage
2. **Forzar inicio en `'home'`** para garantizar estado limpio
3. **Validar `selectedArtist`** antes de renderizar la vista de ejercicios

---

## Pasos de Debugging Realizados

| Paso | Acción |
|------|--------|
| 1 | Verificando app en navegador para diagnosticar bug |
| 2 | Revisando lógica de renderizado condicional en `App.jsx` |
| 3 | Agregando `console.log` para debuggear valor de `currentScreen` |
| 4 | Corrigiendo error "Invalid hook call" que crashea la aplicación |
| 5 | Reiniciando servidor dev y verificando en navegador |

---

## Resumen

| Aspecto | Detalle |
|---------|---------|
| **Tipo de error** | React Hook violation |
| **Causa raíz** | Estado corrupto en `localStorage` causando render con props indefinidos |
| **Síntoma** | La app crashea al cargar, mostrando pantalla blanca |
| **Fix** | Eliminar persistencia de `currentScreen` y forzar inicio en `'home'` |

---

## Lecciones Aprendidas

> [!TIP]
> Al persistir estado de navegación en localStorage, siempre validar que las dependencias necesarias también existan antes de restaurar el estado.

> [!WARNING]
> Nunca asumir que el estado guardado es válido. Implementar fallbacks y validaciones robustas.

---

*Documento generado: 2026-01-03*
