from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
import logging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From, To, Content

# Configura o logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel


class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def root(form: ContactForm):
    # 1. Obter a chave da API do ambiente (será injetada pelo Cloud Run)
    sendgrid_api_key = os.environ.get("SENDGRID_API_KEY")

    if not sendgrid_api_key:
        logger.error("SENDGRID_API_KEY não está configurada.")
        raise HTTPException(status_code=500, detail="Erro interno do servidor: configuração de email ausente.")

    # 2. Criar o objeto 'Mail'
    #    Substitua 'seu-email-verificado@dominio.com' pelo email que você
    #    verificou no SendGrid como 'Single Sender' ou de um domínio autenticado.
    #    Este é o email que aparecerá como O SEU EMAIL DE DESTINO (para onde o formulário vai).
    SALES_EMAIL = "sales@vivid-pixel.com.br"
    MY_EMAIL = "aurelio.pontes@gmail.com"

    mail_message = Mail(
        # O email do remetente (quem preencheu o formulário)
        from_email=From(SALES_EMAIL, form.name),

        # O destinatário (você)
        to_emails=To(MY_EMAIL),

        # O assunto
        subject=f"[Formulário de Contato]",

        # O conteúdo do email
        plain_text_content=Content("text/plain",
            f"Nome: {form.name}\n"
            f"Email: {form.email}\n\n"
            f"Mensagem:\n{form.message}"
        )
    )

    # 3. Enviar o email
    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(mail_message)

        logger.info(f"Email enviado, status code: {response.status_code}")

        return {
            "message": "Email enviado com sucesso!",
            "status_code": response.status_code
        }

    except Exception as e:
        logger.error(f"Erro ao enviar email: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao enviar email: {str(e)}")

