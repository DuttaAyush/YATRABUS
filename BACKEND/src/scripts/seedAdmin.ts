import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  const adminsToEnsure = [
    { email: 'admin@vedbus.in', name: 'Super Admin', phone: '+91 99999 88888', role: 'SUPER_ADMIN' as const },
    { email: 'superadmin@vedbus.in', name: 'Super Admin', phone: '+91 99999 88889', role: 'SUPER_ADMIN' as const },
    { email: 'admin@vedbus.com', name: 'Super Admin', phone: '+91 99999 88887', role: 'SUPER_ADMIN' as const }
  ];

  for (const a of adminsToEnsure) {
    const existing = await prisma.admin.findUnique({ where: { email: a.email } });
    if (!existing) {
      await prisma.admin.create({
        data: {
          name: a.name,
          email: a.email,
          phone: a.phone,
          passwordHash: hash,
          role: a.role,
          isActive: true
        }
      });
      console.log('Created Admin record in Admin table:', a.email);
    } else {
      console.log('Admin already exists in Admin table:', a.email);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
