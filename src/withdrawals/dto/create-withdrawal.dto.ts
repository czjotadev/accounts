/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";
export class CreateWithdrawalDto {
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

  @IsNotEmpty({ message: 'O campo "Valor do Saque" é obrigátorio.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 5 },
    {
      message:
        'O campo "Valor do Saque" deve ser preenchido corretamente. O número de casas decimais não pode ser maior que 5.',
    },
  )
  @Max(999999, {
    message: 'O valor máximo a ser sacado é de R$ 999.999',
  })
  @IsPositive({
    message: 'O campo "Valor do Saque" precisa ser um número positivo.',
  })
  ammount: number;
}
