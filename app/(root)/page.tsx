import Image from "next/image";
import {
  FcAlarmClock,
  FcApproval,
  FcCancel,
  FcCollaboration,
  FcDecision,
  FcHighPriority,
  FcKey,
  FcLineChart,
  FcNews,
  FcSignature,
} from "react-icons/fc";

const AdminPage = () => {
  return (
    <div className="admin-main">
      <section className="w-full py-6">
        <div className="flex gap-8">
          <Image
            src={"/assets/images/profile.png"}
            alt="Admin"
            width={120}
            height={120}
            className="rounded-full w-fit h-14 my-auto"
          />
          <div className="">
            <h1 className="header">Olá, Rebeca!</h1>
            <p className="text-dark-500 font-light mt-2">
              Acompanhe as solicitações diárias
            </p>
          </div>
        </div>
      </section>
      <section className="admin-stat"></section>
    </div>
  );
};

export default AdminPage;
