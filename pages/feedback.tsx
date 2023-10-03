import React, { Fragment, useRef } from "react";
import emailjs from "@emailjs/browser";
import Header from "./components/Header";
import { toast } from "react-toastify";

const Feedback = () => {
  const serviceId: string = process.env.NEXT_PUBLIC_SERVICE_ID || "";
  const templateId: string = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
  const publicKey: string = process.env.NEXT_PUBLIC_KEY || "";

  const form = React.useRef(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
      toast.success("소중한 의견 감사합니다!");
    } catch (error) {
      toast.error("메일 전송이 실패했습니다!");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="flex justify-center h-[100vh]  bg-gray-600">
        <div className="w-2/5 h-[550px] m-auto px-[5%] bg-white shadow-2xl">
          <h1 className="mt-6 mb-2 pb-2 text-[40px] font-bold tracking-widest">
            CONTACT
          </h1>
          <div className="w-full">
            <form ref={form} onSubmit={sendEmail}>
              <div className="flex flex-col mb-8 border-black border-2">
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  className="w-full h-[200px] p-2 tracking-wide"
                />
              </div>

              <div className="flex justify-between mb-10 tracking-wider">
                <div className="flex flex-col w-full mr-10 border-black border-b-2">
                  <label className="text-xl font-bold mb-2">NAME</label>
                  <input type="text" name="user_name" className="h-8 px-2" />
                </div>
                <div className="flex flex-col w-full border-black border-b-2">
                  <label className="text-xl font-bold mb-2">E-MAIL</label>
                  <input type="email" name="user_email" className="h-8 px-2" />
                </div>
              </div>

              <input
                type="submit"
                value="S E N D"
                className="w-full h-[55px] bg-black text-white text-xl font-bold cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Feedback;
