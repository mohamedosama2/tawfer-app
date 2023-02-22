FROM node:14-alpine3.14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install glob rimraf

RUN npm install 

ENV JWT_SECRET="hawhawhahwhahaw"
ENV cloud_name="dd0lgvx4g"
ENV api_key="956576365325988"
ENV api_secret="bFmoe7hyS2Oam9CVa5eYoC9lYYs"
ENV AMQP_URL="amqps://syvqbpub:B2TLduzQNG6qtYWhivLoVCGVE9f1k_db@cow.rmq2.cloudamqp.com/syvqbpub"
ENV projectId=tawfeer"-44539"
ENV privateKey="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7PdgV4ilRJdwV\n2Rrmtf9ckYXy2XHBpezSuVzTfLvuEbJb9p05erG0ojjJPwmwdU5z0l6MngEmb6PM\nUGcsKK0L9bVvotGf6xS13wDMjsO1cOMZpsOq00lGWZsxMrnFM0PEY392kB10Vs6w\nZqh80VwKUNX8JHTvJXVvqkBYYeeDDt/DnW+2ke8BefSAGKUlRq66rNnSYs76NNYH\nJ8UVxaN/7EFxO5FfHRAdfEPAD/8mWSZMmEctgxQBpvUXqDPoyr8CuK4VvhY4y13h\nYBNojVY4vT/wDGt098NDJVCX+UHSVuUk6CNt7/PoPIJt1WEr5tbVwWWBj3jyTnbf\ndQMwOx3TAgMBAAECggEAMDg5hU00gbrjxlaeaGrXRBIP8l4QPyQJbK0i3C4DwcgZ\n7DgC/nH8AL5ELIOI7cIP/aDgC4uHVUwr3SqZn1QsWGejHYhLPslOEJZJAOUFPp0/\nRvRc8ImwFadu4YkkMUZF/fX3teNgSn0uhlwxqM9LyjZOHTyQRqQZbbPlFT3FXskN\ngA6LC+///mssNEZWpYfBVZUReOz6arbeYAeqiTfeOFKQmx8JTYxCqyHAVOCVJIHt\nL4/7c467Eyqmf+BEk6TUetCyt9EMHjo7yZ+h+Mj/pGtE56gumA7DcOjzl4797tlA\nLINzaFNDdbNYhHI4c8TBY8fuqRIuzfwyiOA9etE0VQKBgQDiWFY3L9xxqxp6JLUn\naIKrPUFNxDGq7O0D1NsoXoP3AVocEBwrpH3wvPagTJxv+xoLXkIOBtSlwd4YzXzp\nINHTaOIQndoeVByPFbeGxqVRFCoxcXu1+8tgb2ngOcX6fYSlDKaLy6Q7U2t15YIR\nl9tqsUl7n2lH9kSfxjeAeChClQKBgQDTxfe+8FbLycT/EE5HnKYPAzg3oyiqC03q\n1L/ONB86WfVS6UjkFAOR91zWN3xLuPYTSVPs0SFhWahzh9qTXpnOhXzTr8IdM+Sd\n0eDnsg2ha9nNrK7AzN+NS5HPW7JAScS+KR0bSgHTP1bvRsAB1ZFY00axpcRrZPiz\nL9v/N9bsxwKBgQC0ZaVpXKr8qVtz6Be9re0fH7YRjgHr8eNBf3+gYBwbXKd94FUj\nb3m0ylZiEk1IbsAmOVy6IzWOWsJx0Czy/WZecaRji/vQ2kbcv3lDYMVXppOuTn1D\n4MgKNyISRNmGuE1k4n1Gw+pEIktubppI/VgyY9RmQ/o8EYpGMUwBB0NHNQKBgFYg\n57eyS7qqHwKVgSDC5w6oAo8uPnWaD2B4kmGs9R5oQ8wqsMiCE0mkTw+YlWa+nOYP\nJqDkFS1gp5AFKrJRAUDrLW9yxgHWfx5oo43X7o8+K+DoYFJtgGYY2/53jrFyzx9/\n3SSiHsfptNOv9JtKXsi/dLr/bjk3YaaOymysKy81AoGAf/NhLhqHE7RjW/3YPzxV\n1lupVc9t/K6Nb1SMoJCcCS2XGDadTiTOpwVhUfE9iaUY+n16rpjoODjqHN5iozR7\n+7+OSG0pyC2az38XYQMm9oz28YqBqKcNt6KfzbL9SSAoPhiox3vXzNj24O48k4NG\nf6inkiG7qbOmmEyI79NgRL0=\n-----END PRIVATE KEY-----\n"
ENV clientEmail="firebase-adminsdk-p6ts9@tawfeer-44539.iam.gserviceaccount.com"


COPY . .

RUN npm run build