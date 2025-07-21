# Proplify Design System - Base Classes (Light Theme Only)

Este archivo contiene el sistema de clases base para mantener consistencia en todo el diseño de Proplify.

## 🎨 Filosofía del Sistema

- **Consistencia**: Todas las clases siguen los mismos patrones de nomenclatura
- **Escalabilidad**: Fácil de extender y mantener
- **Reutilización**: Clases modulares que se pueden combinar
- **Tipado**: Full TypeScript support para autocompletado
- **Tema Claro Únicamente**: Diseñado exclusivamente para tema claro, sin modo oscuro

## 📚 Categorías de Clases

### 1. Typography (`typography`)
Clases para texto y tipografía usando Plus Jakarta Sans y Lora.

```tsx
import { typography } from '@/styles/classes';

// Títulos principales (Lora)
<h1 className={typography.h1}>Título Principal</h1>
<h2 className={typography.h2}>Subtítulo</h2>

// Texto del cuerpo (Plus Jakarta Sans)
<p className={typography.body}>Texto normal</p>
<p className={typography.subtitle}>Subtítulo descriptivo</p>
```

### 2. Layout (`layout`)
Clases para estructura y disposición de elementos.

```tsx
import { layout } from '@/styles/classes';

// Contenedores
<div className={layout.container}>Contenido centrado</div>
<div className={layout.containerSmall}>Contenido estrecho</div>

// Flexbox
<div className={layout.flexCenter}>Centrado</div>
<div className={layout.flexBetween}>Espacio entre elementos</div>

// Grid
<div className={layout.gridCols3}>Grid de 3 columnas</div>
```

### 3. Colors (`colors`)
Sistema completo de colores de Proplify con color primary `#222222` y paleta de neutrals.

```tsx
import { colors } from '@/styles/classes';

// Color primary de Proplify (#222222)
<button className={colors.primary.bg}>Botón principal</button>
<h1 className={colors.primary.text}>Título con color primary</h1>

// Paleta de neutrals - Diferentes tonos de gris
// Disponibles: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
<div className="bg-neutrals-50">Fondo muy claro</div>
<div className="bg-neutrals-200">Fondo claro (#EBEBEB)</div>
<div className="bg-neutrals-500">Fondo medio</div>
<div className="bg-neutrals-900">Fondo oscuro</div>

// Colores de texto usando neutrals
<h1 className={colors.text.primary}>Título principal (#222222)</h1>
<p className={colors.text.secondary}>Texto secundario (#404040)</p>
<span className={colors.text.muted}>Texto sutil (#737373)</span>

// Colores de fondo
<div className={colors.bg.primary}>Fondo primary (#222222)</div>
<div className={colors.bg.soft}>Fondo suave (#FAFAFA)</div>
<div className={colors.bg.medium}>Fondo medio (#EBEBEB)</div>

// Colores de borde
<div className={colors.border.default}>Borde por defecto (#EBEBEB)</div>
<div className={colors.border.medium}>Borde medio (#D6D6D6)</div>

// Estados
<div className={colors.state.success.bg}>Éxito</div>
<div className={colors.state.error.bg}>Error</div>

// Interactivos
<button className={colors.interactive.hover}>Hover</button>
<input className={colors.interactive.focus}>Focus</input>
```

#### Paleta de Neutrals Completa:
- `neutrals-50`: `#FAFAFA` - Muy claro
- `neutrals-100`: `#F5F5F5` - Claro
- `neutrals-200`: `#EBEBEB` - Borde por defecto
- `neutrals-300`: `#D6D6D6` - Borde medio
- `neutrals-400`: `#A3A3A3` - Texto sutil
- `neutrals-500`: `#737373` - Texto muted
- `neutrals-600`: `#525252` - Texto terciario
- `neutrals-700`: `#404040` - Texto secundario
- `neutrals-800`: `#262626` - Fondo secundario
- `neutrals-900`: `#171717` - Fondo oscuro

### 4. Backgrounds (`backgrounds`)
Clases para fondos y gradientes.

```tsx
import { backgrounds } from '@/styles/classes';

<div className={backgrounds.white}>Fondo blanco</div>
<div className={backgrounds.blackSoft}>Fondo gris suave</div>
<div className={backgrounds.gradientSubtle}>Gradiente sutil</div>
```

### 4. Components (`components`)
Clases predefinidas para componentes comunes.

```tsx
import { components } from '@/styles/classes';

// Cards
<div className={components.card}>Tarjeta básica</div>
<div className={components.cardHover}>Tarjeta con hover</div>

// Formularios
<div className={components.formGroup}>Grupo de formulario</div>
<div className={components.formActions}>Botones de acción</div>
```

## 🔧 Funciones Utilitarias

### `combineClasses()`
Combina múltiples clases de forma segura:

```tsx
import { combineClasses, typography, layout } from '@/styles/classes';

const className = combineClasses(
  typography.h2,
  layout.flexCenter,
  "custom-class",
  condition && "conditional-class"
);
```

### `createVariants()` y `createSizes()`
Para crear sistemas de variantes en componentes:

```tsx
import { createVariants, createSizes } from '@/styles/classes';

const buttonVariants = createVariants({
  primary: "bg-black text-white",
  secondary: "bg-gray-100 text-black"
});

const buttonSizes = createSizes({
  sm: "px-3 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3"
});
```

## 📝 Ejemplos Prácticos

### Componente Hero Section
```tsx
import { classes, combineClasses } from '@/styles/classes';

export default function HeroSection() {
  return (
    <div className={classes.layout.container}>
      <div className={classes.layout.flexColCenter}>
        <h1 className={classes.typography.h1}>
          Título Principal
        </h1>
        <p className={classes.typography.subtitle}>
          Descripción del producto
        </p>
        <div className={combineClasses(
          classes.components.card,
          classes.shadows.hoverMedium
        )}>
          Contenido de la tarjeta
        </div>
      </div>
    </div>
  );
}
```

### Componente de Formulario
```tsx
import { classes } from '@/styles/classes';

export default function ContactForm() {
  return (
    <div className={classes.components.card}>
      <h3 className={classes.typography.h3}>Contacto</h3>
      
      <form className={classes.components.formGroup}>
        <div className={classes.components.formGroup}>
          <label className={classes.typography.caption}>
            Nombre
          </label>
          <input className={classes.states.focus} />
        </div>
        
        <div className={classes.components.formActions}>
          <button className={classes.states.hover}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
```

## 🎯 Mejores Prácticas

1. **Siempre usa las clases del sistema** antes de crear clases custom
2. **Combina clases** usando `combineClasses()` para mayor legibilidad
3. **Mantén consistencia** en spacing y colores
4. **Documenta clases custom** si son necesarias
5. **Usa TypeScript** para aprovechar el autocompletado

## 🔄 Extensión del Sistema

Para añadir nuevas clases al sistema:

```tsx
// En classes.ts
export const newCategory = {
  newClass: "tailwind-classes-here",
  anotherClass: "more-tailwind-classes",
} as const;

// Añadir a la exportación principal
export const classes = {
  typography,
  layout,
  // ... otras categorías
  newCategory,
} as const;
```

## 🚀 Próximos Pasos

- [ ] Migrar componentes existentes al nuevo sistema
- [ ] Crear más componentes base (Modal, Dropdown, etc.)
- [ ] Añadir animaciones custom al sistema
- [ ] Documentar patrones de diseño específicos de Proplify
