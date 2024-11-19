import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import companyRoutes from './routes/companyRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
