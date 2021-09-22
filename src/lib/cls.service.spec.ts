import { Test, TestingModule } from '@nestjs/testing';
import { createNamespace } from 'cls-hooked';
import { ClsService } from './cls.service';

describe('ClsService', () => {
    let service: ClsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ClsService,
                    useValue: new ClsService(createNamespace('test')),
                },
            ],
        }).compile();

        service = module.get<ClsService>(ClsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should set and retrieve the context', () => {
        service.runAndReturn(() => {
            service.set('key', 123);
            expect(service.get('key')).toEqual(123);
        });
    });
    it('should not retireve context in a different call', () => {
        service.runAndReturn(() => {
            service.set('key', 123);
        });
        service.runAndReturn(() => {
            expect(service.get('key')).not.toEqual(123);
        });
    });
});