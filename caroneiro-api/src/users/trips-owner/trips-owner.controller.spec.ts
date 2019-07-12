import { Test, TestingModule } from '@nestjs/testing';
import { TripsOwnerController } from './trips-owner.controller';

describe('TripsOwner Controller', () => {
  let controller: TripsOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsOwnerController],
    }).compile();

    controller = module.get<TripsOwnerController>(TripsOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
