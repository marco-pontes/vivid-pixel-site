# 1. Usar uma imagem base oficial do Python
FROM python:3.11-slim

# 2. Definir o diretório de trabalho
WORKDIR /code

# 3. Copiar o arquivo de dependências e instalar
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 4. Copiar o código da aplicação
COPY ./ /code/app

# 5. Expor a porta que o Uvicorn irá usar
EXPOSE 8000

# 6. Comando para iniciar a aplicação
#    O host 0.0.0.0 é essencial para que o contêiner seja acessível externamente
CMD ["/bin/sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]