from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime,timedelta, timezone
from email.utils import formataddr
import os
import logging
import boto3
from botocore.exceptions import BotoCoreError, ClientError

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
    # 1. Obter as credenciais AWS do ambiente (serão injetadas pelo Cloud Run)
    aws_region = os.environ.get("AWS_REGION", "us-east-2")
    date = datetime.now(timezone.utc)
    offset = timedelta(hours=-3)
    brasil_time_simples = date + offset

    if not os.environ.get("AWS_ACCESS_KEY_ID") or not os.environ.get("AWS_SECRET_ACCESS_KEY"):
        logger.error("AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY não estão configuradas.")
        raise HTTPException(status_code=500, detail="Erro interno do servidor: configuração de email ausente.")

    # 2. Montar o email
    #    O remetente ('Source') precisa ser um email ou domínio verificado no SES.
    ADMIN_EMAIL = "admin@vivid-pixel.com.br"
    SALES_EMAIL = "sales@vivid-pixel.com.br"

    # 3. Enviar o email
    try:
        ses = boto3.client("ses", region_name=aws_region)
        response = ses.send_email(
            # O remetente (email verificado no SES, com o nome de quem preencheu o formulário)
            Source=formataddr((form.name, ADMIN_EMAIL)),

            # O destinatário
            Destination={"ToAddresses": [SALES_EMAIL]},

            # Responder vai direto para quem preencheu o formulário
            ReplyToAddresses=[form.email],

            Message={
                "Subject": {
                    "Data": f"Formulário de Contato - {form.name} | {brasil_time_simples.strftime('%Y-%m-%d %H:%M:%S')}",
                    "Charset": "UTF-8",
                },
                "Body": {
                    "Text": {
                        "Data": (
                            f"Nome: {form.name}\n"
                            f"Email: {form.email}\n\n"
                            f"Mensagem:\n{form.message}"
                        ),
                        "Charset": "UTF-8",
                    }
                },
            },
        )

        logger.info(f"Email enviado, message id: {response['MessageId']}")

        return {
            "message": "Email enviado com sucesso!",
            "status_code": 200
        }

    except (BotoCoreError, ClientError) as e:
        logger.error(f"Erro ao enviar email: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao enviar email: {str(e)}")

@app.get("/api/ping")
async def root():
    return {
                        "message": "Sucesso",
                        "status_code": 200
                    }