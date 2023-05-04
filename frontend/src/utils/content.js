// מערכת הזמנות
// מערכת מלאי
// מערכת לקוחות
// מערכת הצעות מחיר - V
// מערכת פורום
// מערכת מוצרים - V

// List,Item,Details

export const readyProductList = {
  firstMeals: [
    `פילה טונה`,
    `פילה דניס`,
    `פילה סלומון`,
    `פילה סלומון אפוי בתנור`,
    `דג מטוגן/מרלוזה`,
  ],
  secondMeals: [`בשר צלי ברוטב פטריות`, "כרעיים עוף בתנור", "שניצלים"],
  additionals: [`בשר צלי ברוטב פטריות`, "כרעיים עוף בתנור", "שניצלים"],
  salads: [`מטבוחה`, "סלט פיצוחים", "קולסלאום", "תירס מקסיקני", "גמבה צבעים"],
  oneTimeColors: {
    plates: ["כחול", "ירוק", "לבן", "שחור"],
    maps: ["כחול", "ירוק", "לבן", "שחור"],
    forkKnife: ["כחול", "ירוק", "לבן", "שחור"],
  },
  softDrinks: ["קולה", "ספרייט", "פנטה"],
  generals: ["לחמניות צמה"],
};
export const productList = {
  firstMeals: [
    `פילה טונה`,
    `פילה אמנון`,
    `פילה דניס`,
    `פילה סלומון`,
    `פילה סלומון אפוי בתנור`,
    `דג מטוגן/מרלוזה`,
  ],
  secondMeals: [`בשר צלי ברוטב פטריות`, "כרעיים עוף בתנור", "שניצלים"],
  additionals: [`בשר צלי ברוטב פטריות`, "כרעיים עוף בתנור", "שניצלים"],
  salads: [
    `מטבוחה`,
    "חציל בלאדי על האש",
    "סלט פיצוחים",
    "קולסלאום",
    "תירס מקסיקני",
    "גמבה צבעים",
  ],
  oneTimeColors: {
    plates: ["כחול", "ירוק", "לבן", "שחור"],
    maps: ["כחול", "ירוק", "לבן", "שחור"],
    forkKnife: ["כחול", "ירוק", "לבן", "שחור"],
  },
  softDrinks: ["קולה", "ספרייט", "פנטה"],
  generals: ["לחמניות צמה"],
};

export const cateringList = [
  {
    _id: 1,
    name: `קייטרינג לסעודת מצווה`,
    description: `     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        dolores?`,
    menus: [
      { name: `תפריט רגיל`, menu: { readyProductList } },
      { name: `תפריט בהתאמה אישית`, menu: { productList } },
    ],
  },
  {
    _id: 2,
    name: `קייטרינג לבר/בת מצווה`,
    description: `     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        dolores?`,
    menus: [`תפריט רגיל`, "תפריט בהתאמה אישית"],
  },
  {
    _id: 3,
    name: `קייטרינג לחינות`,
    description: `     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        dolores?`,
    menus: [`תפריט רגיל`, "תפריט בהתאמה אישית"],
  },
  {
    _id: 4,
    name: `קייטרינג לעלייה לתורה`,
    description: `     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        dolores?`,
    menus: [`תפריט רגיל`, "תפריט בהתאמה אישית"],
  },
  {
    _id: 5,
    name: `קייטרינג לבריתות`,
    description: `     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        dolores?`,
    menus: [`תפריט רגיל`, "תפריט בהתאמה אישית"],
  },
];

export const bidList = [
  {
    _id: 1,
    title: `הצעת מחיר עבור אירוע קייטרינג`,
    customerName: `יוסי`,
    customerPhone: `0526757706`,
    customerEmail: `inviteserv@gmail.com`,
    content: `<></>`,
    date: `2023-05-02`,
  },
  {
    _id: 2,
    title: `הצעת מחיר עבור אירוע קייטרינג`,
    customerName: `יוסי`,
    customerPhone: `0526757706`,
    customerEmail: `inviteserv@gmail.com`,
    content: `<></>`,
    date: `2023-05-02`,
  },
  {
    _id: 3,
    title: `הצעת מחיר עבור אירוע קייטרינג`,
    customerName: `יוסי`,
    customerPhone: `0526757706`,
    customerEmail: `inviteserv@gmail.com`,
    content: `<></>`,
    date: `2023-05-02`,
  },
  {
    _id: 4,
    title: `הצעת מחיר עבור אירוע קייטרינג`,
    customerName: `יוסי`,
    customerPhone: `0526757706`,
    customerEmail: `inviteserv@gmail.com`,
    content: `<></>`,
    date: `2023-05-02`,
  },
];

export const customerList = [
  {
    _id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "555-555-5555",
    address: "123 Main St, Anytown, USA",
    createdAt: `22-05-04`,
    orders: [
      {
        orderId: "12345",
        orderDate: "2023-04-30",
        orderTotal: 100.0,
        shippingAddress: "123 Main St, Anytown, USA",
      },
      {
        orderId: "67890",
        orderDate: "2023-05-01",
        orderTotal: 75.0,
        shippingAddress: "456 Market St, Anytown, USA",
      },
    ],
  },
  {
    _id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "555-555-5555",
    address: "456 Market St, Anytown, USA",
    orders: [
      {
        orderId: "13579",
        orderDate: "2023-05-02",
        orderTotal: 50.0,
        shippingAddress: "456 Market St, Anytown, USA",
      },
    ],
  },
];

export const orderList = [
  {
    _id: "1",
    customerId: 1,
    products: [
      {
        id: "1",
        name: "Product 1",
        price: 50.0,
        quantity: 2,
      },
      {
        id: "2",
        name: "Product 2",
        price: 25.0,
        quantity: 1,
      },
    ],
    date: "2023-05-03",
    total: 125.0,
    status: "Delivered",
  },
  {
    _id: "2",
    customerId: 1,
    products: [
      {
        id: "3",
        name: "Product 3",
        price: 10.0,
        quantity: 3,
      },
    ],
    date: "2023-05-02",
    total: 30.0,
    status: "In Transit",
  },
];

export const productList2 = [
  {
    _id: "1",
    name: "Product 1",
    description: "This is product 1",
    price: 50.0,
    quantity: 10,
    createdAt: `2022-05-02`,
    images: [
      {
        id: "1",
        url: "https://example.com/product1-image1.jpg",
      },
      {
        id: "2",
        url: "https://example.com/product1-image2.jpg",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "John Doe",
        rating: 4,
        comment: "This product is great!",
      },
    ],
  },
  {
    _id: "2",
    name: "Product 2",
    description: "This is product 1",
    price: 50.0,
    quantity: 10,
    createdAt: `2022-05-02`,
    images: [
      {
        id: "1",
        url: "https://example.com/product1-image1.jpg",
      },
      {
        id: "2",
        url: "https://example.com/product1-image2.jpg",
      },
    ],
    reviews: [
      {
        id: "1",
        author: "John Doe",
        rating: 4,
        comment: "This product is great!",
      },
    ],
  },
];

export const postList = [
  {
    _id: "1",
    title: "My First Post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: 1,
    tags: ["tag1", "tag2", "tag3"],
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: {
      likes: 0,
      users: [],
    },
    shares: {
      shares: 0,
      users: [],
    },
  },
];

export const inventoryList = [
  {
    _id: "1",
    name: "Raw material A",
    quantity: 1000,
    unit: "kg",
    pricePerUnit: 1.5,
    supplier: "יוחננוף",
    products: [
      {
        name: `מוצר 1`,
        _id: `1`,
      },
    ],
  },
];

export const updateList = [
  {
    _id: "1",
    name: "Raw material A",
    quantity: 1000,
    unit: "kg",
    pricePerUnit: 1.5,
    supplier: "יוחננוף",
    products: [
      {
        name: `מוצר 2`,
        _id: `2`,
      },
    ],
  },
];
