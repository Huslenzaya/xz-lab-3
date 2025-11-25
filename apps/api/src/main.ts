import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import {
  YellowBookEntrySchema,
  YellowBookListSchema,
} from '@weblab3/contract';
import { API_PORT, CLIENT_ORIGIN } from '@weblab3/config';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CORS
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

// Security headers
app.use(helmet());

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// GET /yellow-books (list)
app.get('/yellow-books', async (_req, res) => {
  try {
    const records = await prisma.yellowBook.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    const transformed = records.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      pricePerMonth: r.pricePerMonth,
      address: r.address,
      latitude: r.latitude,
      longitude: r.longitude,
      category: r.category,
      status: r.status,
      contactName: r.contactName,
      phone: r.phone,
      email: r.email ?? undefined,
      publishedAt: r.publishedAt.toISOString(),
    }));

    const valid = YellowBookListSchema.parse(transformed);

    res.json(valid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /yellow-books/:id (details)
app.get('/yellow-books/:id', async (req, res) => {
  try {
    const record = await prisma.yellowBook.findUnique({
      where: { id: req.params.id },
    });

    if (!record) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const transformed = {
      id: record.id,
      title: record.title,
      description: record.description,
      pricePerMonth: record.pricePerMonth,
      address: record.address,
      latitude: record.latitude,
      longitude: record.longitude,
      category: record.category,
      status: record.status,
      contactName: record.contactName,
      phone: record.phone,
      email: record.email ?? undefined,
      publishedAt: record.publishedAt.toISOString(),
    };

    const valid = YellowBookEntrySchema.parse(transformed);

    res.json(valid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /yellow-books (optional – rubric дээр 400 validation оноонд хэрэгтэй)
app.post('/yellow-books', async (req, res) => {
  try {
    const parsed = YellowBookEntrySchema.partial({
      id: true,
      publishedAt: true,
    }).parse(req.body);

    const created = await prisma.yellowBook.create({
      data: {
        ...parsed,
        publishedAt: parsed.publishedAt
          ? new Date(parsed.publishedAt)
          : undefined,
      },
    });

    const transformed = {
      ...created,
      publishedAt: created.publishedAt.toISOString(),
    };

    const valid = YellowBookEntrySchema.parse(transformed);

    res.status(201).json(valid);
  } catch (error: any) {
    console.error(error);

    if (error?.name === 'ZodError') {
      res.status(400).json({
        error: 'Invalid input',
        details: error.errors,
      });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(API_PORT, () => {
  console.log(`API listening on http://localhost:${API_PORT}`);
});