
import 'dotenv/config'
import app from './app'

const { PORT } = process.env || 3001

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
