const convertCurrency = (value: number): string => {
  return (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  })
}

export default convertCurrency
