/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { PrismaClient, transaction_status } from '@prisma/client';

describe('DepositsService', () => {
  let depositsService: DepositsService;
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    depositsService = new DepositsService(prismaClient);
  });

  describe('find', () => {
    it('should return a deposit by id', async () => {
      const findFirstOrThrowMock = jest.spyOn(
        prismaClient.deposit,
        'findFirstOrThrow',
      );
      const mockDeposit = {
        id: 1,
        accountNumber: 1234567890,
        ammount: 100,
        status: transaction_status.APPROVED,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      findFirstOrThrowMock.mockResolvedValueOnce(mockDeposit);

      const result = await depositsService.find(1);

      expect(result).toEqual(mockDeposit);

      findFirstOrThrowMock.mockRestore();
    });

    it('should throw an HttpException if deposit is not found', async () => {
      const findFirstOrThrowMock = jest.spyOn(
        prismaClient.deposit,
        'findFirstOrThrow',
      );
      findFirstOrThrowMock.mockRejectedValueOnce(
        new Error('Deposit not found'),
      );

      try {
        await depositsService.find(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        expect(error.response.message).toBe("Deposit not found");
      }

      findFirstOrThrowMock.mockRestore();
    });
  });
});
