import { RegisterModalProps } from "@/interfaces";
export default function RegisterModal({
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center content-center mb-4">
          <h2 className="text-xl font-semibold ">Create an Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <label htmlFor="text"> Full Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" />
          <label htmlFor="email">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-medium hover:underline cursor-pointer"
            onClick={onLoginClick}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
