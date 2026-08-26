/* ==========================================================================
   S2 FASHION — Product Data
   Static product catalog. In a future version this array can be replaced
   by a fetch() call to a real backend/API (see comment at bottom of file).
   Images use picsum.photos seeded placeholders (stable, will not disappear)
   so they can later be swapped for local files at images/product-N.jpg
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    category: "Dresses",
    price: 45.00,
    oldPrice: 60.00,
    discount: 25,
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#f4f1ea"],
    image: "https://picsum.photos/seed/s2-p1/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p1b/700/900",
    isNew: true,
    description: "A flowing summer dress cut from breathable cotton-blend fabric. Featuring a flattering A-line silhouette, adjustable straps and a subtle sheen, it moves effortlessly from daytime brunches to golden-hour dinners."
  },
  {
    id: 2,
    name: "Tailored Linen Blazer",
    category: "Tops",
    price: 89.00,
    oldPrice: null,
    discount: 0,
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2b2822", "#b7afa0"],
    image: "https://picsum.photos/seed/s2-p2/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p2b/700/900",
    isNew: false,
    description: "A structured linen blazer with a single-button close and soft shoulder padding. Lightweight enough for warm days, sharp enough for the boardroom."
  },
  {
    id: 3,
    name: "Classic White Shirt",
    category: "Shirts",
    price: 38.00,
    oldPrice: 48.00,
    discount: 21,
    rating: 4.7,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#ffffff", "#e7dfcf"],
    image: "https://picsum.photos/seed/s2-p3/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p3b/700/900",
    isNew: false,
    description: "The everyday white shirt, reimagined. Crisp cotton poplin, a relaxed fit through the body and a slightly dropped shoulder for modern ease."
  },
  {
    id: 4,
    name: "High-Rise Straight Jeans",
    category: "Jeans",
    price: 62.00,
    oldPrice: null,
    discount: 0,
    rating: 4.5,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["#2b2822", "#7c6a4e"],
    image: "https://picsum.photos/seed/s2-p4/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p4b/700/900",
    isNew: true,
    description: "Rigid-wash denim cut with a high rise and straight leg. A rigid, sculpting fit that softens beautifully after a few wears."
  },
  {
    id: 5,
    name: "Wide-Leg Tailored Pants",
    category: "Pants",
    price: 58.00,
    oldPrice: 72.00,
    discount: 19,
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#17140f", "#b7afa0"],
    image: "https://picsum.photos/seed/s2-p5/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p5b/700/900",
    isNew: false,
    description: "Fluid wide-leg trousers with a pressed front crease and a fully lined waistband. Pairs equally well with heels or trainers."
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    category: "Skirts",
    price: 42.00,
    oldPrice: null,
    discount: 0,
    rating: 4.6,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#e7dfcf", "#2b2822"],
    image: "https://picsum.photos/seed/s2-p6/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p6b/700/900",
    isNew: true,
    description: "Knife-pleated midi skirt in a fluid satin-back crepe. Falls just below the knee with gentle movement in every step."
  },
  {
    id: 7,
    name: "Oversized Wool Jacket",
    category: "Jackets",
    price: 129.00,
    oldPrice: 160.00,
    discount: 19,
    rating: 4.9,
    sizes: ["S", "M", "L"],
    colors: ["#2b2822", "#17140f"],
    image: "https://picsum.photos/seed/s2-p7/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p7b/700/900",
    isNew: false,
    description: "A boxy wool-blend jacket built for layering, with dropped shoulders and deep welt pockets. The season's essential outer layer."
  },
  {
    id: 8,
    name: "Silk Slip Dress",
    category: "Dresses",
    price: 76.00,
    oldPrice: 95.00,
    discount: 20,
    rating: 4.8,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#7c6a4e", "#1a1a1a"],
    image: "https://picsum.photos/seed/s2-p8/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p8b/700/900",
    isNew: true,
    description: "Cut on the bias from lustrous silk-blend charmeuse, this slip dress skims the body for an understated, elegant drape."
  },
  {
    id: 9,
    name: "Ribbed Knit Top",
    category: "Tops",
    price: 29.00,
    oldPrice: null,
    discount: 0,
    rating: 4.3,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#b7afa0", "#17140f", "#e7dfcf"],
    image: "https://picsum.photos/seed/s2-p9/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p9b/700/900",
    isNew: false,
    description: "A second-skin ribbed knit top with a fitted silhouette and a soft crew neckline. A wardrobe staple that layers well under everything."
  },
  {
    id: 10,
    name: "Denim Trucker Jacket",
    category: "Jackets",
    price: 68.00,
    oldPrice: 85.00,
    discount: 20,
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2b2822"],
    image: "https://picsum.photos/seed/s2-p10/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p10b/700/900",
    isNew: false,
    description: "A washed denim jacket with a relaxed boxy cut, corozo buttons and a chest pocket detail. Built to fade beautifully with wear."
  },
  {
    id: 11,
    name: "Satin Cami Top",
    category: "Tops",
    price: 32.00,
    oldPrice: null,
    discount: 0,
    rating: 4.4,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#f4f1ea", "#7c6a4e"],
    image: "https://picsum.photos/seed/s2-p11/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p11b/700/900",
    isNew: true,
    description: "A minimal satin camisole with adjustable straps and a bias-cut hem. Dress it up under the tailored blazer or wear it alone."
  },
  {
    id: 12,
    name: "Straight-Fit Chinos",
    category: "Pants",
    price: 54.00,
    oldPrice: null,
    discount: 0,
    rating: 4.2,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#b7afa0", "#2b2822"],
    image: "https://picsum.photos/seed/s2-p12/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p12b/700/900",
    isNew: false,
    description: "Cotton-twill chinos with a straight leg and a comfortable mid rise. Finished with a clean, unfussed front."
  },
  {
    id: 13,
    name: "Floral Wrap Dress",
    category: "Dresses",
    price: 54.00,
    oldPrice: 68.00,
    discount: 21,
    rating: 4.7,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#7c6a4e", "#e7dfcf"],
    image: "https://picsum.photos/seed/s2-p13/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p13b/700/900",
    isNew: false,
    description: "A soft viscose wrap dress in a small-scale floral print. The tie waist defines the silhouette while the skirt moves freely."
  },
  {
    id: 14,
    name: "A-Line Denim Skirt",
    category: "Skirts",
    price: 39.00,
    oldPrice: null,
    discount: 0,
    rating: 4.3,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#2b2822"],
    image: "https://picsum.photos/seed/s2-p14/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p14b/700/900",
    isNew: true,
    description: "A knee-length denim skirt with a gently flared A-line cut and a button-through front. Effortless and endlessly versatile."
  },
  {
    id: 15,
    name: "Merino Crew Sweater",
    category: "Tops",
    price: 74.00,
    oldPrice: 92.00,
    discount: 20,
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#17140f", "#b7afa0", "#7c6a4e"],
    image: "https://picsum.photos/seed/s2-p15/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p15b/700/900",
    isNew: false,
    description: "Fine-gauge merino wool sweater with a classic crew neckline. Warm without bulk, and soft enough to wear against the skin."
  },
  {
    id: 16,
    name: "Slim Tapered Jeans",
    category: "Jeans",
    price: 65.00,
    oldPrice: null,
    discount: 0,
    rating: 4.4,
    sizes: ["28", "30", "32", "34"],
    colors: ["#1a1a1a"],
    image: "https://picsum.photos/seed/s2-p16/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p16b/700/900",
    isNew: false,
    description: "Stretch denim in a slim through the thigh, tapered ankle fit. A dark, clean rinse makes these easy to dress up or down."
  },
  {
    id: 17,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 95.00,
    oldPrice: 120.00,
    discount: 21,
    rating: 4.9,
    sizes: ["One Size"],
    colors: ["#2b2822", "#7c6a4e"],
    image: "https://picsum.photos/seed/s2-p17/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p17b/700/900",
    isNew: true,
    description: "A compact crossbody in full-grain leather with an adjustable strap and a secure magnetic closure. Fits the daily essentials."
  },
  {
    id: 18,
    name: "Girls' Cloud Nightgown",
    category: "Girls' Nightwear",
    price: 24.00,
    oldPrice: 30.00,
    discount: 20,
    rating: 4.7,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["#f4f1ea", "#e7dfcf"],
    image: "https://picsum.photos/seed/s2-p18/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p18b/700/900",
    isNew: true,
    description: "A soft cotton-jersey nightgown with a cloud print and short sleeves. Breathable and gentle on sensitive skin for restful nights."
  },
  {
    id: 19,
    name: "Girls' Pyjama Set",
    category: "Girls' Nightwear",
    price: 27.00,
    oldPrice: null,
    discount: 0,
    rating: 4.6,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["#b7afa0", "#7c6a4e"],
    image: "https://picsum.photos/seed/s2-p19/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p19b/700/900",
    isNew: false,
    description: "A two-piece pyjama set in brushed cotton with a relaxed top and elasticated-waist bottoms. Made for easy movement and long sleep."
  },
  {
    id: 20,
    name: "Wool-Blend Overcoat",
    category: "Jackets",
    price: 148.00,
    oldPrice: 185.00,
    discount: 20,
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#17140f", "#b7afa0"],
    image: "https://picsum.photos/seed/s2-p20/700/900",
    imageAlt: "https://picsum.photos/seed/s2-p20b/700/900",
    isNew: false,
    description: "A knee-length overcoat in a heavyweight wool blend, with a notched lapel and a single-breasted, two-button close. The season's investment piece."
  }
];

/* --------------------------------------------------------------------------
   FUTURE BACKEND INTEGRATION
   To replace this static array with a real API, swap the PRODUCTS constant
   for something like:

     let PRODUCTS = [];
     async function loadProducts() {
       const res = await fetch("https://api.yourdomain.com/products");
       PRODUCTS = await res.json();
     }

   ...and call loadProducts() before any code in app.js / product.js that
   reads PRODUCTS runs (e.g. wrap the page init in an async function).
   -------------------------------------------------------------------------- */
