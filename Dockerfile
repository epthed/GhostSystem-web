FROM heroku/heroku:20

WORKDIR /opt/ghostsystem
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - 
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list 
RUN apt update \
    && apt install -y yarn 
COPY . /opt/ghostsystem/