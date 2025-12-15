var admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://int305fb-default-rtdb.firebaseio.com",
});

var db = getFirestore();

var products = [
  {
    name: "iPhone 16 Pro",
    price: 39900,
    stock: 30,
    inStock: true,
    category: "mobile",
    colors: ["black", "white", "gold"],
    specs: { ram: 8, storage: 256 },
    createdAt: new Date("2025-01-01T10:00:00Z"),
  },
  {
    name: "Samsung Galaxy S25",
    price: 35900,
    stock: 20,
    inStock: true,
    category: "mobile",
    colors: ["blue", "silver"],
    specs: { ram: 12, storage: 512 },
    createdAt: new Date("2025-01-02T12:00:00Z"),
  },
  {
    name: "MacBook Pro 14",
    price: 79900,
    stock: 15,
    inStock: true,
    category: "laptop",
    colors: ["space gray"],
    specs: { ram: 16, storage: 512 },
    createdAt: new Date("2025-01-03T09:00:00Z"),
  },
  {
    name: "AirPods Pro 3",
    price: 8990,
    stock: 50,
    inStock: true,
    category: "accessory",
    colors: ["white"],
    specs: { noiseCancel: true },
    createdAt: new Date("2025-01-04T11:00:00Z"),
  },
  {
    name: "iPad Air 7",
    price: 22900,
    stock: 25,
    inStock: true,
    category: "tablet",
    colors: ["blue", "pink"],
    specs: { ram: 6, storage: 128 },
    createdAt: new Date("2025-01-05T14:00:00Z"),
  },
  {
    name: "ASUS ROG Laptop",
    price: 65900,
    stock: 10,
    inStock: true,
    category: "laptop",
    colors: ["black"],
    specs: { ram: 32, storage: 1024 },
    createdAt: new Date("2025-01-06T08:00:00Z"),
  },
  {
    name: "Apple Watch S10",
    price: 12900,
    stock: 18,
    inStock: true,
    category: "watch",
    colors: ["silver", "black"],
    specs: { size: 44 },
    createdAt: new Date("2025-01-07T13:00:00Z"),
  },
  {
    name: "Sony WH-1000XM6",
    price: 12990,
    stock: 12,
    inStock: true,
    category: "accessory",
    colors: ["black", "silver"],
    specs: { battery: 40 },
    createdAt: new Date("2025-01-08T16:00:00Z"),
  },
  {
    name: "GoPro Hero 13",
    price: 18900,
    stock: 8,
    inStock: true,
    category: "camera",
    colors: ["black"],
    specs: { resolution: "5K" },
    createdAt: new Date("2025-01-09T09:00:00Z"),
  },
  {
    name: "Dell XPS 15",
    price: 89900,
    stock: 7,
    inStock: true,
    category: "laptop",
    colors: ["white"],
    specs: { ram: 32, storage: 1024 },
    createdAt: new Date("2025-01-10T15:00:00Z"),
  },
];

/* -------------------------------
   COLLECTION 2: users
-------------------------------- */

var users = [
  {
    username: "pwr_sr",
    email: "pwr@example.com",
    age: 20,
    roles: ["buyer"],
    profile: { firstName: "Pawarit", lastName: "Sr" },
    isActive: true,
    createdAt: new Date("2025-01-01T10:00:00Z"),
  },
  {
    username: "mild123",
    email: "mild@example.com",
    age: 22,
    roles: ["buyer", "seller"],
    profile: { firstName: "Mild", lastName: "K" },
    isActive: true,
    createdAt: new Date("2025-01-02T11:00:00Z"),
  },
  {
    username: "bossx",
    email: "boss@example.com",
    age: 21,
    roles: ["buyer"],
    profile: { firstName: "Boss", lastName: "N" },
    isActive: false,
    createdAt: new Date("2025-01-03T12:00:00Z"),
  },
  {
    username: "jane_d",
    email: "jane@example.com",
    age: 19,
    roles: ["seller"],
    profile: { firstName: "Jane", lastName: "D" },
    isActive: true,
    createdAt: new Date("2025-01-04T13:00:00Z"),
  },
  {
    username: "steve01",
    email: "steve@example.com",
    age: 30,
    roles: ["buyer"],
    profile: { firstName: "Steve", lastName: "P" },
    isActive: true,
    createdAt: new Date("2025-01-05T14:00:00Z"),
  },
  {
    username: "may_s",
    email: "may@example.com",
    age: 24,
    roles: ["buyer", "seller"],
    profile: { firstName: "May", lastName: "S" },
    isActive: false,
    createdAt: new Date("2025-01-06T15:00:00Z"),
  },
  {
    username: "johnwick",
    email: "john@example.com",
    age: 35,
    roles: ["buyer"],
    profile: { firstName: "John", lastName: "Wick" },
    isActive: true,
    createdAt: new Date("2025-01-07T16:00:00Z"),
  },
  {
    username: "linda_kk",
    email: "linda@example.com",
    age: 28,
    roles: ["buyer"],
    profile: { firstName: "Linda", lastName: "K" },
    isActive: true,
    createdAt: new Date("2025-01-08T17:00:00Z"),
  },
  {
    username: "admin1",
    email: "admin@example.com",
    age: 27,
    roles: ["admin"],
    profile: { firstName: "Super", lastName: "Admin" },
    isActive: true,
    createdAt: new Date("2025-01-09T18:00:00Z"),
  },
  {
    username: "neo",
    email: "neo@example.com",
    age: 23,
    roles: ["buyer"],
    profile: { firstName: "Neo", lastName: "M" },
    isActive: false,
    createdAt: new Date("2025-01-10T19:00:00Z"),
  },
];

/* -------------------------------
   COLLECTION 3: orders
-------------------------------- */

var orders = [
  {
    userId: "pwr_sr",
    items: [{ productId: "1", qty: 1 }],
    totalPrice: 39900,
    status: "pending",
    address: { city: "Bangkok", zip: 10140 },
    createdAt: new Date("2025-01-01T12:00:00Z"),
    isPaid: false,
  },
  {
    userId: "mild123",
    items: [{ productId: "3", qty: 1 }],
    totalPrice: 79900,
    status: "paid",
    address: { city: "Bangkok", zip: 10110 },
    createdAt: new Date("2025-01-02T11:00:00Z"),
    isPaid: true,
  },
  {
    userId: "bossx",
    items: [{ productId: "4", qty: 2 }],
    totalPrice: 17980,
    status: "pending",
    address: { city: "Chiang Mai", zip: 50000 },
    createdAt: new Date("2025-01-03T10:00:00Z"),
    isPaid: false,
  },
  {
    userId: "jane_d",
    items: [{ productId: "2", qty: 1 }],
    totalPrice: 35900,
    status: "shipped",
    address: { city: "Bangkok", zip: 10900 },
    createdAt: new Date("2025-01-04T09:00:00Z"),
    isPaid: true,
  },
  {
    userId: "steve01",
    items: [{ productId: "5", qty: 1 }],
    totalPrice: 22900,
    status: "paid",
    address: { city: "Rayong", zip: 21000 },
    createdAt: new Date("2025-01-05T14:00:00Z"),
    isPaid: true,
  },
  {
    userId: "may_s",
    items: [{ productId: "6", qty: 1 }],
    totalPrice: 65900,
    status: "pending",
    address: { city: "Phuket", zip: 83000 },
    createdAt: new Date("2025-01-06T18:00:00Z"),
    isPaid: false,
  },
  {
    userId: "johnwick",
    items: [{ productId: "7", qty: 1 }],
    totalPrice: 12900,
    status: "paid",
    address: { city: "Bangkok", zip: 10120 },
    createdAt: new Date("2025-01-07T08:00:00Z"),
    isPaid: true,
  },
  {
    userId: "linda_kk",
    items: [{ productId: "8", qty: 1 }],
    totalPrice: 12990,
    status: "shipped",
    address: { city: "Nonthaburi", zip: 11000 },
    createdAt: new Date("2025-01-08T13:00:00Z"),
    isPaid: true,
  },
  {
    userId: "admin1",
    items: [{ productId: "9", qty: 1 }],
    totalPrice: 18900,
    status: "pending",
    address: { city: "Bangkok", zip: 10200 },
    createdAt: new Date("2025-01-09T16:00:00Z"),
    isPaid: false,
  },
  {
    userId: "neo",
    items: [{ productId: "10", qty: 1 }],
    totalPrice: 89900,
    status: "paid",
    address: { city: "Chiang Mai", zip: 50100 },
    createdAt: new Date("2025-01-10T11:00:00Z"),
    isPaid: true,
  },
];


products.forEach((obj) => {
  db.collection("products")
    .add(obj)
    .then((docRef) => console.log("Product added:", docRef.id));
});

users.forEach((obj) => {
  db.collection("users")
    .add(obj)
    .then((docRef) => console.log("User added:", docRef.id));
});

orders.forEach((obj) => {
  db.collection("orders")
    .add(obj)
    .then((docRef) => console.log("Order added:", docRef.id));
});
