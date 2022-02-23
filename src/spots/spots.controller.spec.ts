import { Test, TestingModule } from '@nestjs/testing';
import { SpotType, SPOT_SIZE } from 'src/constants/spots.constants';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';

describe('SpotsController', () => {
  let controller: SpotsController;

  const mockSpotsService = {
    // createSpot: jest.fn((dto) => {
    //   return {
    //     id: 1,
    //     size: SPOT_SIZE[dto.type],
    //   };
    // }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotsController],
      providers: [
        {
          provide: SpotsService,
          useValue: {},
        },
      ],
    })
      // .overrideProvider(SpotsService)
      // .useValue(mockSpotsService)
      .compile();

    controller = module.get<SpotsController>(SpotsController);
  });

  it('should be defintd', () => {
    expect(controller).toBeDefined();
  });

  // it('should create spot', () => {
  //   expect(controller.createSpot({ type: SpotType.medium })).toEqual({
  //     id: expect.any(Number),
  //     size: 2,
  //   });
  // });
});
