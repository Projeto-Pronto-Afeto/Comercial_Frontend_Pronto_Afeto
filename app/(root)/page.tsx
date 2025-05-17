import { getUserFromCookies } from "@/helpers/getUserFromToken";
import WelcomeHeader from "@/components/WelcomeHeader";

const AdminPage = async () => {
  const user = await getUserFromCookies();

  
  return (
    <div className="admin-main">
      <section className="w-full ">
        <WelcomeHeader
          nome={user?.perfil?.nome || "Admin"}
          fotoUrl={user?.perfil?.fotoUrl}
        />
      </section>
    </div>
  );
};

export default AdminPage;