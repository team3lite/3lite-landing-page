import Image from "next/image";
import AuthMattedBackground from "./_components/AuthMattedBackground";
import MobileAuth from "./_components/MobileAuth";
import AuthMessage from "./_components/AuthMessage";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const layout = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <>
        <div className="sm:grid hidden text-white sm:grid-cols-2  bg-[#070322] h-screen">
          <div className="bg-[#3A197B]   overflow-hidden flex place-content-center place-items-center  h-full">
            <div className=" h-full   flex  justify-center relative w-full bg-re-100">
              <div className="w-fit ">
                <AuthMattedBackground />
              </div>
              <div className="absolute top-20 z-[5]">
                <Image
                  src="/general/3Lite.png"
                  className="h-[480px] w-auto"
                  width={302}
                  height={601}
                  alt="mockup"
                />
              </div>
              <div className="bg-gradient-to-b  py-7 px-10 flex flex-col place-items-center from-[#6235A2] from-0% to-[#34176A] to-100%  bottom-0 absolute z-10 w-full h-[30vh]">
                <div className="w-[460px] max-w-full px-5 flex flex-col h-full ">
                  <AuthMessage />
                  <div className="mt-auto flex  gap-0  w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="6"
                      fill="none"
                      viewBox="0 0 28 6"
                    >
                      <circle cx="3" cy="3" r="3" fill="#fff" />
                      <circle cx="14" cy="3" r="3" fill="#C8497F" />
                      <circle cx="25" cy="3" r="3" fill="#C8497F" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex place-content-center place-items-center h-full">
            {children}
          </div>
        </div>
        <div className="h-full overflow-hidden bg-red-200 w-screen sm:hidden">
          <MobileAuth>{children}</MobileAuth>
        </div>
      </>
    </GoogleOAuthProvider>
  );
};

export default layout;
