// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc  CREATE A USER
// @route POST /api/v1/auth/register
// @access Public
