import { Test, TestingModule } from '@nestjs/testing';
import { SpotType, SPOT_SIZE } from '../constants/spots.constants';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';

describe('SpotsController', () => {
  let controller: SpotsController;

  const mockSpotsService = {
    createSpot: jest.fn((dto) => {
      return {
        id: 1,
        size: SPOT_SIZE[dto.type],
      };
    }),
    updateSpot: jest.fn().mockImplementation((dto) => {
      return {
        id: dto.id,
        size: SPOT_SIZE[dto.type],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotsController],
      providers: [SpotsService],
    })
      .overrideProvider(SpotsService)
      .useValue(mockSpotsService)
      .compile();

    controller = module.get<SpotsController>(SpotsController);
  });

  it('should be defintd', () => {
    expect(controller).toBeDefined();
  });

  it('should create spot', () => {
    const dto = { type: SpotType.medium };
    expect(controller.createSpot(dto)).toEqual({
      id: expect.any(Number),
      size: 2,
    });

    expect(mockSpotsService.createSpot).toHaveBeenCalledWith(dto);
  });

  it('should update spot', () => {
    const dto = { id: 5, type: SpotType.medium };

    expect(controller.updateSpot(dto)).toEqual({
      id: 5,
      size: 2,
    });

    expect(mockSpotsService.updateSpot).toHaveBeenCalledWith(dto);
  });
});
