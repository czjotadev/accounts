/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';

export class CreateAccountDto {
  @IsInt({
    message: 'O campo "Número da Conta" precisa ser um número inteiro.',
  })
  @IsNotEmpty({ message: 'O campo "Número da Conta" é obrigátorio.' })
  @IsPositive({
    message: 'O campo "Número da Conta" precisa ser um número positivo.',
  })
  @Max(99999, {
    message: 'O tamanho máximo do campo "Número da Conta" é de 5 caracteres.',
  })
  accountNumber: number;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 5 },
    { message: 'O campo "Saldo da Conta" deve ser preenchido corretamente. O número de casas decimais não pode ser maior que 5.' },
  )
  @Max(9999999999, {
    message: 'O valor máximo a ser depositado é de R$ 9.999.999.999',
  })
  @IsPositive({
    message: 'O campo "Saldo da Conta" precisa ser um número positivo.',
  })
  balance?: number;
}
