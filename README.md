# Calculadora de Remesas

Una aplicación de escritorio moderna para calcular y gestionar remesas internacionales con soporte para múltiples monedas y proveedores P2P.

![Calculadora de Remesas](https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Características

- 💱 **Gestión de Tasas de Cambio**
  - Configuración de tasas de compra/venta
  - Tabla de tasas cruzadas
  - Guardado automático de tasas

- 🔄 **Cálculo de Remesas**
  - Soporte para múltiples monedas
  - Cálculo de comisiones
  - Integración con proveedores P2P
  - Roles maker/taker

- 📊 **Análisis Detallado**
  - Desglose completo de operaciones
  - Cálculo de ganancias
  - Visualización de comisiones
  - Montos finales en moneda destino

- 📝 **Historial y Estadísticas**
  - Registro de transacciones
  - Estadísticas de ganancias
  - Análisis de comisiones
  - Filtros por período

## Tecnologías

- ⚛️ React
- 🎨 Tailwind CSS
- ⚡ Vite
- 🖥️ Electron
- 📦 TypeScript

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run electron:dev

# Construir la aplicación
npm run electron:make
```

## Estructura del Proyecto

```
├── electron/          # Configuración de Electron
├── src/
│   ├── components/    # Componentes React
│   ├── types/        # Tipos TypeScript
│   ├── utils/        # Utilidades y helpers
│   └── App.tsx       # Componente principal
└── vite.config.ts    # Configuración de Vite
```

## Monedas Soportadas

- 🇺🇸 USD (Dólar Estadounidense)
- 🇻🇪 VES (Bolívar Venezolano)
- 🇵🇪 PEN (Sol Peruano)
- 🇨🇱 CLP (Peso Chileno)
- 🇨🇴 COP (Peso Colombiano)
- 🇧🇷 BRL (Real Brasileño)

## Proveedores P2P

- Binance P2P
  - Maker: 0.20% por operación
  - Taker: 0.05 USDT fijo por operación

- Dorado
  - Maker: 0.25%
  - Taker: Tarifas variables según monto

## Licencia

MIT
