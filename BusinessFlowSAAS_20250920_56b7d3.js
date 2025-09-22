// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Mock database (in production, use PostgreSQL with Prisma)
let users = [];
let companies = [];
let invoices = [];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and company
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'owner',
      companyId: companies.length + 1
    };

    const newCompany = {
      id: companies.length + 1,
      name: company,
      ownerId: newUser.id
    };

    users.push(newUser);
    companies.push(newCompany);

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newCompany.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    const company = companies.find(c => c.id === user.companyId);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: company ? company.name : ''
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected routes
app.get('/api/dashboard', authenticateToken, (req, res) => {
  // Get dashboard data for the user's company
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const companyInvoices = invoices.filter(i => i.companyId === user.companyId);
  const totalRevenue = companyInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingInvoices = companyInvoices.filter(i => i.status === 'pending');

  res.json({
    stats: {
      totalRevenue,
      profit: totalRevenue * 0.7, // Simplified calculation
      pendingInvoices: pendingInvoices.length,
      payrollDue: '3 days' // Mock data
    },
    recentActivity: companyInvoices.slice(-5).map(invoice => ({
      id: invoice.id,
      type: 'invoice',
      description: `Invoice #${invoice.invoiceNumber} ${invoice.status === 'paid' ? 'paid' : 'created'}`,
      amount: invoice.amount,
      date: invoice.date,
      client: invoice.clientName
    }))
  });
});

// Invoices routes
app.get('/api/invoices', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  const companyInvoices = invoices.filter(i => i.companyId === user.companyId);
  res.json(companyInvoices);
});

app.post('/api/invoices', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  const { clientName, items, dueDate } = req.body;

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const newInvoice = {
    id: invoices.length + 1,
    companyId: user.companyId,
    invoiceNumber: `INV-${String(invoices.length + 1).padStart(4, '0')}`,
    clientName,
    items,
    amount: totalAmount,
    dueDate,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    paymentLink: `https://businessflow.com/pay/${Math.random().toString(36).substring(2, 15)}`,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://businessflow.com/pay/${Math.random().toString(36).substring(2, 15)}`
  };

  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});