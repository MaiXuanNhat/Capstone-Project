FROM python:latest

WORKDIR "/Flask-server"

COPY . "/Flask-server"

# Install requirements
RUN pip install -r requirements.txt

RUN pip install python-dotenv

# IPython
EXPOSE 8888

# Flask
EXPOSE 5000

CMD ["python", "server.py"]