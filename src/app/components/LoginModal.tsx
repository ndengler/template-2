import React from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <p className="mb-4">Please sign in to add notes.</p>
        <button
          onClick={onGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
