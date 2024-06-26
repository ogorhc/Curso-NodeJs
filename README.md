# Curso-NodeJs

Curso de Node.Js: De cero a experto de Fernando Herrera en devtalles.com

https://cursos.devtalles.com/enrollments

Enlances de interés:

## Event loop

**What is the Event Loop?**

https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

**A Complete Visual Guide to Understanding the Node.js Event Loop**

https://www.builder.io/blog/visual-guide-to-nodejs-event-loop

## Testing

### Pasos para configurar Jest con TypeScript, en Node

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)

1. Instalaciones de desarrollo (super test es útil para probar Express)

```
npm install -D jest @types/jest ts-jest supertest
```

2. Crear archivo de configuración de Jest

```
npx jest --init
```

3. En el archivo **jest.config.js** configurar

```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**

```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```
