import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";

export class CreateTransferDto {
    @ApiProperty({
        description: 'Número da conta de Origem',
        minimum: 1,
        maximum: 99999,
        type: Number,
      })
      @IsInt({
        message: 'O campo "Número da conta de Origem" precisa ser um número inteiro.',
      })
      @IsNotEmpty({ message: 'O campo "Número da conta de Origem" é obrigátorio.' })
      @IsPositive({
        message: 'O campo "Número da conta de Origem" precisa ser um número positivo.',
      })
      @Max(99999, {
        message: 'O tamanho máximo do campo "Número da conta de Origem" é de 5 caracteres.',
      })
      originAccountNumber: number;

      @ApiProperty({
        description: 'Número da conta de destino',
        minimum: 1,
        maximum: 99999,
        type: Number,
      })
      @IsInt({
        message: 'O campo "Número da conta de destino" precisa ser um número inteiro.',
      })
      @IsNotEmpty({ message: 'O campo "Número da conta de destino" é obrigátorio.' })
      @IsPositive({
        message: 'O campo "Número da conta de destino" precisa ser um número positivo.',
      })
      @Max(99999, {
        message: 'O tamanho máximo do campo "Número da conta de destino" é de 5 caracteres.',
      })
      targetAccountNumber: number;
    
      @ApiProperty({
        description: 'Valor da transferencia',
        minimum: 1,
        maximum: 999999,
        type: Number
      })
      @IsNotEmpty({ message: 'O campo "Valor da transferencia" é obrigátorio.' })
      @IsNumber(
        { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 5 },
        {
          message:
            'O campo "Valor da transferencia" deve ser preenchido corretamente. O número de casas decimais não pode ser maior que 5.',
        },
      )
      @Max(999999, {
        message: 'O valor máximo a ser transferido é de R$ 999.999',
      })
      @IsPositive({
        message: 'O campo "Valor da transferencia" precisa ser um número positivo.',
      })
      ammount: number;
}