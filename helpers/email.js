import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config()


const emailConfirmacion = async (datos) => {
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const {nombre, email, token} = datos;

     await transport.sendMail({
        from : process.env.APP_NAME,
        to : email,
        subject : `Bienvenido a ${process.env.APP_NAME} ${nombre}`,
        text :  `Bienvenido a ${process.env.APP_NAME} ${nombre}`,
        html  : `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Bienvenido a ${process.env.APP_NAME}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    /* Estilos básicos para la mayoría de clientes */
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      padding: 24px 0;
    }

    .card {
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    .header {
      background-color: #1d7cf3;
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
      font-size: 32px;
      font-weight: 700;
    }

    .content {
      padding: 32px 32px 40px;
      color: #111827;
      font-size: 16px;
      line-height: 1.6;
    }

    .content p {
      margin: 0 0 16px;
    }

    .btn-wrapper {
      padding-top: 16px;
    }

    .btn {
      display: inline-block;
      padding: 12px 32px;
      border-radius: 6px;
      background-color: #1d7cf3;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
    }

    .footer {
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 16px 24px 24px;
      font-size: 13px;
      color: #6b7280;
      background-color: #f3f4f6;
    }

    @media (max-width: 640px) {
      .card {
        border-radius: 0;
      }
      .content {
        padding: 24px 20px 32px;
      }
      .header {
        padding: 24px 16px;
        font-size: 26px;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" class="wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <!-- Tarjeta principal -->
        <table role="presentation" class="card" cellpadding="0" cellspacing="0">
          <!-- Cabecera azul -->
          <tr>
            <td class="header">
              ¡Hola ${nombre}
            </td>
          </tr>
          <!-- Contenido -->
          <tr>
            <td class="content">
              <p>Estimado ${nombre},</p>

              <p>
                Este es un correo de prueba enviado desde tu aplicación con
                <strong>Nodemailer</strong>.
              </p>

              <p>
                Recuerda personalizar este contenido según tus necesidades.
              </p>

              <div class="btn-wrapper">
                <a href="${process.env.APP_URL}:${process.env.APP_PORT}/admin/confirmar/${token}" class="btn">
                  Ir a la app
                </a>
              </div>
            </td>
          </tr>
        </table>

        <!-- Pie -->
        <div class="footer">
          Este correo fue generado automáticamente. No respondas a este mensaje.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`,
     })

}




const  emailRecuperarPassword = async(token, email, nombre)=>{
  var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

  await transport.sendMail({
    from : process.env.APP_NAME,
    to : email,
    subject : 'Recuperación de contraseña',
    text : 'Solicitaste recuperar la contraseña?',
    html :`
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Hola ${nombre} 🙂</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    /* Estilos básicos para la mayoría de clientes */
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      padding: 24px 0;
    }

    .card {
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    .header {
      background-color: #1d7cf3;
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
      font-size: 32px;
      font-weight: 700;
    }

    .content {
      padding: 32px 32px 40px;
      color: #111827;
      font-size: 16px;
      line-height: 1.6;
    }

    .content p {
      margin: 0 0 16px;
    }

    .btn-wrapper {
      padding-top: 16px;
    }

    .btn {
      display: inline-block;
      padding: 12px 32px;
      border-radius: 6px;
      background-color: #1d7cf3;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
    }

    .footer {
      max-width: 640px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 16px 24px 24px;
      font-size: 13px;
      color: #6b7280;
      background-color: #f3f4f6;
    }

    @media (max-width: 640px) {
      .card {
        border-radius: 0;
      }
      .content {
        padding: 24px 20px 32px;
      }
      .header {
        padding: 24px 16px;
        font-size: 26px;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" class="wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <!-- Tarjeta principal -->
        <table role="presentation" class="card" cellpadding="0" cellspacing="0">
          <!-- Cabecera azul -->
          <tr>
            <td class="header">
              ¡Hola ${nombre}
            </td>
          </tr>
          <!-- Contenido -->
          <tr>
            <td class="content">
              <p>Estimado ${nombre},</p>

              <p>
                Enviaste una solicitud de recuperación de contraseña.  si no fuiste tu ignora este mensaje.<br>
                <strong>Pasos para restablecer la contraseña</strong>.
              </p>

              <p>
                No hay problema si necesitas recuperar tu contraseña varias veces; estamos aquí para ayudarte.
                
                Aun así, sabemos que repetir este proceso puede ser incómodo, así que vale la pena usar una clave fuerte para mantener alejados a los intrusos 😑 y amigable para tu memoria 😊     
              </p>

              <div class="btn-wrapper">
                <a href="${process.env.APP_URL}:${process.env.APP_PORT}/admin/recuperar/${token}" class="btn">
                  Recuperar Contraseña.
                </a>
              </div>
            </td>
          </tr>
        </table>

        <!-- Pie -->
        <div class="footer">
          Este correo fue generado automáticamente. No respondas a este mensaje.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  })

}

export {
    emailConfirmacion, emailRecuperarPassword
}