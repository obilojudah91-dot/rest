import { PrismaClient, Role, OrderStatus, ReservationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartfoods.com' },
    update: {},
    create: {
      email: 'admin@smartfoods.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: Role.ADMINISTRATOR,
      emailVerified: true,
      isActive: true,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@smartfoods.com' },
    update: {},
    create: {
      email: 'manager@smartfoods.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Manager',
      phone: '+1234567891',
      role: Role.MANAGER,
      emailVerified: true,
      isActive: true,
    },
  });

  const chef = await prisma.user.upsert({
    where: { email: 'chef@smartfoods.com' },
    update: {},
    create: {
      email: 'chef@smartfoods.com',
      password: hashedPassword,
      firstName: 'Gordon',
      lastName: 'Chef',
      phone: '+1234567892',
      role: Role.CHEF,
      emailVerified: true,
      isActive: true,
    },
  });

  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@smartfoods.com' },
    update: {},
    create: {
      email: 'cashier@smartfoods.com',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Cashier',
      phone: '+1234567893',
      role: Role.CASHIER,
      emailVerified: true,
      isActive: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+1234567894',
      role: Role.CUSTOMER,
      emailVerified: true,
      isActive: true,
    },
  });

  console.log('Users created');

  // Create categories
  const appetizers = await prisma.category.upsert({
    where: { slug: 'appetizers' },
    update: {},
    create: {
      name: 'Appetizers',
      slug: 'appetizers',
      description: 'Start your meal with our delicious appetizers',
      order: 1,
    },
  });

  const mains = await prisma.category.upsert({
    where: { slug: 'mains' },
    update: {},
    create: {
      name: 'Main Courses',
      slug: 'mains',
      description: 'Our signature main dishes',
      order: 2,
    },
  });

  const desserts = await prisma.category.upsert({
    where: { slug: 'desserts' },
    update: {},
    create: {
      name: 'Desserts',
      slug: 'desserts',
      description: 'Sweet endings to your meal',
      order: 3,
    },
  });

  const beverages = await prisma.category.upsert({
    where: { slug: 'beverages' },
    update: {},
    create: {
      name: 'Beverages',
      slug: 'beverages',
      description: 'Refreshing drinks and cocktails',
      order: 4,
    },
  });

  console.log('Categories created');

  // Create products
  const products = [
    {
      name: 'Crispy Calamari',
      slug: 'crispy-calamari',
      description: 'Golden fried calamari rings served with marinara sauce and lemon',
      price: 14.99,
      categoryId: appetizers.id,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
      calories: 320,
      protein: '18g',
      carbs: '24g',
      fat: '16g',
      fiber: '2g',
      allergens: ['gluten', 'shellfish'],
      isAvailable: true,
      isPopular: true,
      isFeatured: true,
      preparationTime: 15,
    },
    {
      name: 'Bruschetta',
      slug: 'bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil',
      price: 9.99,
      categoryId: appetizers.id,
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500',
      calories: 180,
      protein: '4g',
      carbs: '22g',
      fat: '8g',
      fiber: '3g',
      allergens: ['gluten'],
      isAvailable: true,
      isPopular: false,
      isFeatured: false,
      preparationTime: 10,
    },
    {
      name: 'Grilled Salmon',
      slug: 'grilled-salmon',
      description: 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables',
      price: 28.99,
      categoryId: mains.id,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
      calories: 420,
      protein: '38g',
      carbs: '12g',
      fat: '24g',
      fiber: '4g',
      allergens: ['fish'],
      isAvailable: true,
      isPopular: true,
      isFeatured: true,
      preparationTime: 25,
    },
    {
      name: 'Ribeye Steak',
      slug: 'ribeye-steak',
      description: 'Premium 12oz ribeye steak cooked to your preference, served with mashed potatoes',
      price: 34.99,
      categoryId: mains.id,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
      calories: 650,
      protein: '52g',
      carbs: '28g',
      fat: '42g',
      fiber: '3g',
      allergens: [],
      isAvailable: true,
      isPopular: true,
      isFeatured: true,
      preparationTime: 30,
    },
    {
      name: 'Chicken Parmesan',
      slug: 'chicken-parmesan',
      description: 'Breaded chicken breast topped with marinara and melted mozzarella',
      price: 22.99,
      categoryId: mains.id,
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500',
      calories: 580,
      protein: '42g',
      carbs: '35g',
      fat: '28g',
      fiber: '4g',
      allergens: ['gluten', 'dairy'],
      isAvailable: true,
      isPopular: false,
      isFeatured: false,
      preparationTime: 25,
    },
    {
      name: 'Tiramisu',
      slug: 'tiramisu',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone',
      price: 10.99,
      categoryId: desserts.id,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
      calories: 380,
      protein: '8g',
      carbs: '42g',
      fat: '18g',
      fiber: '1g',
      allergens: ['dairy', 'eggs', 'gluten'],
      isAvailable: true,
      isPopular: true,
      isFeatured: true,
      preparationTime: 5,
    },
    {
      name: 'Chocolate Lava Cake',
      slug: 'chocolate-lava-cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      price: 12.99,
      categoryId: desserts.id,
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
      calories: 520,
      protein: '10g',
      carbs: '58g',
      fat: '28g',
      fiber: '3g',
      allergens: ['dairy', 'eggs', 'gluten'],
      isAvailable: true,
      isPopular: true,
      isFeatured: false,
      preparationTime: 15,
    },
    {
      name: 'Signature Cocktail',
      slug: 'signature-cocktail',
      description: 'Our house special cocktail with premium spirits and fresh ingredients',
      price: 14.99,
      categoryId: beverages.id,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
      calories: 180,
      protein: '0g',
      carbs: '12g',
      fat: '0g',
      fiber: '0g',
      allergens: [],
      isAvailable: true,
      isPopular: false,
      isFeatured: true,
      preparationTime: 5,
    },
    {
      name: 'Fresh Lemonade',
      slug: 'fresh-lemonade',
      description: 'Freshly squeezed lemonade with mint leaves',
      price: 6.99,
      categoryId: beverages.id,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500',
      calories: 120,
      protein: '0g',
      carbs: '32g',
      fat: '0g',
      fiber: '0g',
      allergens: [],
      isAvailable: true,
      isPopular: true,
      isFeatured: false,
      preparationTime: 5,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Products created');

  // Create branch
  const branch = await prisma.branch.upsert({
    where: { id: 'default-branch' },
    update: {},
    create: {
      id: 'default-branch',
      name: 'Downtown Location',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1234567890',
      email: 'downtown@smartfoods.com',
      isOpen: true,
      openingHours: {
        monday: { open: '11:00', close: '22:00' },
        tuesday: { open: '11:00', close: '22:00' },
        wednesday: { open: '11:00', close: '22:00' },
        thursday: { open: '11:00', close: '22:00' },
        friday: { open: '11:00', close: '23:00' },
        saturday: { open: '10:00', close: '23:00' },
        sunday: { open: '10:00', close: '21:00' },
      },
      latitude: 40.7128,
      longitude: -74.0060,
    },
  });

  console.log('Branch created');

  // Create employees
  await prisma.employee.upsert({
    where: { userId: manager.id },
    update: {},
    create: {
      userId: manager.id,
      branchId: branch.id,
      position: 'General Manager',
      salary: 75000,
    },
  });

  await prisma.employee.upsert({
    where: { userId: chef.id },
    update: {},
    create: {
      userId: chef.id,
      branchId: branch.id,
      position: 'Head Chef',
      salary: 65000,
    },
  });

  await prisma.employee.upsert({
    where: { userId: cashier.id },
    update: {},
    create: {
      userId: cashier.id,
      branchId: branch.id,
      position: 'Cashier',
      salary: 35000,
    },
  });

  console.log('Employees created');

  // Create ingredients
  const ingredients = [
    { name: 'Salmon Fillet', unit: 'kg', stock: 50, minStock: 10, cost: 25.00, supplier: 'Fresh Fish Co' },
    { name: 'Ribeye Steak', unit: 'kg', stock: 40, minStock: 10, cost: 35.00, supplier: 'Prime Meats' },
    { name: 'Chicken Breast', unit: 'kg', stock: 60, minStock: 15, cost: 12.00, supplier: 'Poultry Farms' },
    { name: 'Calamari', unit: 'kg', stock: 30, minStock: 8, cost: 18.00, supplier: 'Seafood Direct' },
    { name: 'Tomatoes', unit: 'kg', stock: 80, minStock: 20, cost: 4.00, supplier: 'Local Farms' },
    { name: 'Olive Oil', unit: 'L', stock: 25, minStock: 5, cost: 15.00, supplier: 'Italian Imports' },
    { name: 'Flour', unit: 'kg', stock: 100, minStock: 20, cost: 3.00, supplier: 'Bakery Supplies' },
    { name: 'Mozzarella', unit: 'kg', stock: 35, minStock: 10, cost: 12.00, supplier: 'Dairy Fresh' },
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: ingredient,
    });
  }

  console.log('Ingredients created');

  // Create coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      description: 'Welcome discount for new customers',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrder: 30,
      maxDiscount: 20,
      usageLimit: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'SUMMER25',
      description: 'Summer special discount',
      discountType: 'PERCENTAGE',
      discountValue: 25,
      minOrder: 50,
      maxDiscount: 30,
      usageLimit: 500,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  console.log('Coupons created');

  // Create gallery images
  const galleryImages = [
    { title: 'Restaurant Interior', description: 'Beautiful dining area', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', category: 'interior', order: 1 },
    { title: 'Chef at Work', description: 'Our chef preparing dishes', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', category: 'kitchen', order: 2 },
    { title: 'Signature Dish', description: 'Our famous ribeye steak', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800', category: 'food', order: 3 },
    { title: 'Fresh Ingredients', description: 'Only the freshest ingredients', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', category: 'food', order: 4 },
  ];

  for (const image of galleryImages) {
    await prisma.gallery.create({ data: image });
  }

  console.log('Settings created');

  // Create settings
  await prisma.settings.create({
    data: {
      key: 'restaurant_name',
      value: 'Smart Foods',
      description: 'Restaurant name',
    },
  });

  await prisma.settings.create({
    data: {
      key: 'restaurant_description',
      value: 'Experience fine dining at its best',
      description: 'Restaurant description',
    },
  });

  await prisma.settings.create({
    data: {
      key: 'tax_rate',
      value: 8.5,
      description: 'Tax rate percentage',
    },
  });

  await prisma.settings.create({
    data: {
      key: 'delivery_fee',
      value: 4.99,
      description: 'Default delivery fee',
    },
  });

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
