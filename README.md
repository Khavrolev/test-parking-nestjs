# test-parking-nestjs

КN Test Task

## How to run

```bash
npm install

docker-compose up -d

npm run start
```

- There is debug module, where you can initialize spots (check rest-api/init.http). Use variable SPOTS_AMOUNT in src/debug/debug.service.ts to configure amount of spots;

- Size of spots and transports are configurable, check variable SPOT_SIZE in src/constants/spots.constants.ts and variable TRANSPORT_SIZE in src/transports/transports.constants.ts;

- Input string for type of spot and transport are also configurable, check enum SpotType in src/constants/spots.constants.ts and enum TransportType in src/transports/transports.constants.ts;

- You can find all neccesery API requests with their overview in rest-api/spots.http and rest-api/transports.http;
