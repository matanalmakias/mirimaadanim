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
