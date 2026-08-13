// Seed catalog data for CT Ecomm Web Demo
// Images are deterministic placeholder photos (picsum.photos/seed/...) so every
// reload shows the same picture for the same product.

const categories = [
  { id: "sarees", name: "Sarees", icon: "🥻" },
  { id: "lehengas", name: "Lehengas", icon: "👗" },
  { id: "salwar-kameez", name: "Salwar Kameez", icon: "🧵" },
  { id: "kurtis", name: "Kurtis & Kurtas", icon: "👘" },
  { id: "jewellery", name: "Jewellery", icon: "💍" },
  { id: "menswear", name: "Men's Wear", icon: "👔" },
  { id: "footwear", name: "Footwear", icon: "👡" },
  { id: "home-decor", name: "Home Decor", icon: "🏠" },
];

const rawProducts = [
  // Sarees
  ["Beige Embroidered Georgette Saree", "sarees", 2499, 4999, 4.3, 128],
  ["Maroon Banarasi Silk Saree", "sarees", 3299, 6599, 4.6, 214],
  ["Teal Printed Chiffon Saree", "sarees", 1799, 3599, 4.1, 76],
  ["Mustard Yellow Cotton Handloom Saree", "sarees", 1999, 3999, 4.4, 95],
  ["Wine Sequin Georgette Party Saree", "sarees", 2899, 5799, 4.2, 61],
  ["Pink Kanjivaram Silk Saree", "sarees", 4499, 8999, 4.7, 302],
  ["Navy Blue Linen Saree with Blouse", "sarees", 2199, 4399, 4.0, 54],
  ["Green Bandhani Print Saree", "sarees", 1699, 3399, 4.3, 88],

  // Lehengas
  ["Red Bridal Embroidered Lehenga Choli", "lehengas", 8999, 17999, 4.8, 187],
  ["Peach Sequinned Party Lehenga", "lehengas", 5499, 10999, 4.4, 92],
  ["Royal Blue Silk Lehenga Set", "lehengas", 6299, 12599, 4.5, 110],
  ["Mint Green Floral Lehenga Choli", "lehengas", 4799, 9599, 4.2, 66],
  ["Golden Zari Work Bridal Lehenga", "lehengas", 10999, 21999, 4.9, 245],
  ["Pastel Pink Georgette Lehenga", "lehengas", 3999, 7999, 4.1, 41],

  // Salwar Kameez
  ["Cream Anarkali Salwar Suit", "salwar-kameez", 2199, 4399, 4.3, 73],
  ["Grey Cotton Straight Suit Set", "salwar-kameez", 1499, 2999, 4.0, 58],
  ["Rani Pink Patiala Salwar Suit", "salwar-kameez", 1899, 3799, 4.2, 64],
  ["Sky Blue Embroidered Palazzo Suit", "salwar-kameez", 2399, 4799, 4.4, 82],
  ["Black Georgette Anarkali Gown Suit", "salwar-kameez", 2999, 5999, 4.5, 99],
  ["Orange Rayon Printed Kurti Suit", "salwar-kameez", 1699, 3399, 4.1, 47],

  // Kurtis & Kurtas
  ["White Chikankari Cotton Kurti", "kurtis", 999, 1999, 4.2, 152],
  ["Rust Printed Rayon A-Line Kurti", "kurtis", 799, 1599, 4.0, 88],
  ["Indigo Block Print Straight Kurta", "kurtis", 899, 1799, 4.3, 103],
  ["Olive Green Embroidered Kurti", "kurtis", 1099, 2199, 4.1, 69],
  ["Lavender Floral Print Kurti Set", "kurtis", 1299, 2599, 4.4, 77],
  ["Coral High-Low Cotton Kurti", "kurtis", 949, 1899, 4.0, 55],

  // Jewellery
  ["Gold Plated Kundan Choker Necklace Set", "jewellery", 1299, 2599, 4.5, 210],
  ["Oxidised Silver Jhumka Earrings", "jewellery", 399, 799, 4.3, 340],
  ["Pearl Studded Bridal Maang Tikka", "jewellery", 599, 1199, 4.2, 96],
  ["Antique Temple Coin Necklace Set", "jewellery", 1499, 2999, 4.6, 178],
  ["Meenakari Peacock Design Bangles (Set of 4)", "jewellery", 699, 1399, 4.1, 84],
  ["Ruby Red Stone Statement Ring", "jewellery", 449, 899, 4.0, 61],

  // Men's Wear
  ["Navy Blue Nehru Jacket", "menswear", 1799, 3599, 4.2, 72],
  ["White Cotton Kurta Pajama Set", "menswear", 1499, 2999, 4.4, 118],
  ["Maroon Silk Blend Sherwani", "menswear", 5999, 11999, 4.6, 143],
  ["Beige Linen Casual Shirt", "menswear", 999, 1999, 4.0, 54],
  ["Black Embroidered Kurta Set", "menswear", 2199, 4399, 4.3, 89],

  // Footwear
  ["Golden Embellished Juttis", "footwear", 899, 1799, 4.3, 132],
  ["Silver Kolhapuri Sandals", "footwear", 799, 1599, 4.1, 97],
  ["Maroon Velvet Mojaris", "footwear", 999, 1999, 4.4, 108],
  ["Beige Block Heel Sandals", "footwear", 1299, 2599, 4.0, 63],

  // Home Decor
  ["Brass Hand-Carved Diya Set (Pack of 6)", "home-decor", 599, 1199, 4.5, 156],
  ["Embroidered Silk Cushion Cover (Set of 2)", "home-decor", 799, 1599, 4.2, 88],
  ["Wooden Hand-Painted Wall Hanging", "home-decor", 1199, 2399, 4.3, 71],
  ["Warli Art Table Runner", "home-decor", 499, 999, 4.1, 49],
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const products = rawProducts.map(([name, category, price, mrp, rating, reviews], idx) => {
  const id = `${category}-${idx + 1}`;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);
  return {
    id,
    name,
    category,
    slug: slugify(name),
    price,
    mrp,
    discountPercent,
    rating,
    reviews,
    images: [
      `https://picsum.photos/seed/${id}-a/600/800`,
      `https://picsum.photos/seed/${id}-b/600/800`,
    ],
    description: `${name} — crafted with premium materials and finished with intricate detailing. A versatile pick for festive occasions, celebrations and everyday elegance. Perfect addition to your wardrobe from CT Ecomm Web Demo.`,
    stock: 10 + (idx % 15),
  };
});

module.exports = { categories, products };
