import { Test, TestingModule } from '@nestjs/testing';
import { ChatGroupController } from './chat-group.controller';

describe('ChatGroupController', () => {
  let controller: ChatGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGroupController],
    }).compile();

    controller = module.get<ChatGroupController>(ChatGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
