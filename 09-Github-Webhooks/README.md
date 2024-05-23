# Proyecto NOC

El objetivo es utilizar Webhook de un repositorio de Github para enviar mensaje a un servidor de Discord

# dev

1. Crear el archivo .env
2. Abrir powershell y ejecutar

```
ngrok http 3000
```

3. Configurar webhook de github con url proporcionado por ngrok y el SECRET_TOKEN que se desee

4. Configurar variables de entorno obteniendo el enlace de Discord y introduciendo el SECRET_TOKEN utilizado en github

```
PORT = 3000

DISCORD_WEBHOOK_URL=

SECRET_TOKEN=
```

4. Ejecutar

```
npm run dev
```
