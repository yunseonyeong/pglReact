# npm 사용하려면 alpine 은 너무 사이즈가 작고, node 이미지 사용해야 한다.
FROM node:16-alpine

# 경로
WORKDIR /usr/src/app

# react의 package.json 을 컨테이너 안에 복사
COPY package.json ./

# npm install 해 package.json 안의 dependencies의 필요한 모듈들 설치
RUN npm install

# 전체 react 디렉토리의 모든 파일 경로 복사해 WORKDIR 에 넣어준다.
COPY ./ ./

# 컨테이너 시작 시 실행될 명령어
CMD ["npm", "run", "start"]