import { FaTimes } from "react-icons/fa";

const Modal = ({ body, setChange, color }) => {
  return (
    <div className={`flex flex-col border w-auto py-4 px-12 absolute top-8 xl:left-[39.5%] lg:left-[35%] md:left-[29%] rounded-md bg-white shadow-md h-24 justify-center ${color}`}>
      <p onClick={() => setChange(false)} className="cursor-pointer absolute top-3 right-3 hover:text-gray-700 transition duration-300">
        <FaTimes className="text-lg" />
      </p>
      <h1 className="text-4xl">{body}</h1>
    </div>
  );
};

export default Modal;
