import { ExtendedSignInModalProps } from "@/interfaces";

export default function SignInModal({
  onClose,
  onRegisterClick,
}: ExtendedSignInModalProps) {
  return (
    <div
      className="fixed inset-0 px-2  bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 ">
            Welcome Back!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm  font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full px-4 border-gray-600 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-medium hover:underline cursor-pointer"
            onClick={() => {
              onRegisterClick();
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
