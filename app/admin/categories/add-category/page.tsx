

// src/app/admin/categories/add-category/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import AddCategoryForm from "@/components/admin/forms/AddCategoryForm";

export default async function AddCategoryPage() {
  // 1. 🛡️ CONTROLLO DI SICUREZZA LATO SERVER
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    // Se non è amministratore, blocca l'accesso e reindirizza alla Home
    redirect(routes.home);
  }

  // 2. 🎬 PASSA IL TESTIMONE
  // Serviamo il componente visivo (il form)
  return <AddCategoryForm />;
}