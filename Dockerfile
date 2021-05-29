FROM heroku/heroku:20

WORKDIR /opt/ghostsystem
RUN apt update \
    && apt install -y npm 
COPY . /opt/ghostsystem/
RUN npm install