import { Test, TestingModule } from '@nestjs/testing';
import { ChatGroupService } from './chat-group.service';

describe('ChatGroupService', () => {
  let service: ChatGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGroupService],
    }).compile();

    service = module.get<ChatGroupService>(ChatGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
