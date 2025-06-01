FROM node:lts-buster

RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/SLG-DEV/SLG-MD.git /ovl_bot

WORKDIR /ovl_bot

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm", "run", "Slg"]
