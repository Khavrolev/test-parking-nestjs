# test-parking-nestjs

КN Test Task

## Installation

```bash
npm install

docker-compose up -d
```

- Configure SPOTS_AMOUNT in src/constants/spots.constants.ts;
- Send init POST request in rest-api/init.http;
- You can change input type string for spots and transports in src/constants/spots.constants.ts and src/transports/transports.constants.ts;
- You can find all neccesery API requests with their overview in rest-api/spots.http and rest-api/transports.http;
