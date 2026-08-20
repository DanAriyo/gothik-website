// src/lib/routes.ts

// Definiamo le radici principali per evitare ripetizioni
const ADMIN_BASE = "/admin";

export const routes = {
  // Rotte Pubbliche
  landing: "/",
  home: "/home",
  about: "/about-us",
  cart: "/cart",
  profile: "/profile",
  orders: "/orders",
  login: "/auth/signin",
  categoryDetail: (id: string | number) => `/category/${id}`,
  productDetail: (id: string | number) => `/product/${id}`,
  
  // Schermate di Autenticazione
  auth: {
    signIn: "/signin",
  },

  // Area Amministrativa Protetta (Pannello Arsenale)
  admin: {
    dashboard: `${ADMIN_BASE}/dashboard`,
    users: `${ADMIN_BASE}/users`,
    
    // Gestione Prodotti
    products: {
      index: `${ADMIN_BASE}/products`,
      add: `${ADMIN_BASE}/products/add-product`,
      edit: (id: string | number) => `${ADMIN_BASE}/products/edit/${id}`,
    },
    
    // Gestione Categorie
    categories: {
      index: `${ADMIN_BASE}/categories`,
      add: `${ADMIN_BASE}/categories/add-category`,
      edit: (id: string | number) => `${ADMIN_BASE}/categories/edit/${id}`,
    }
  }
};