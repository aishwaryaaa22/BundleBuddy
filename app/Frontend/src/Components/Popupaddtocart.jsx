import { useEffect, useState } from "react";

export default function Popupaddtocart() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => setShow(true), 1000);

   
    const closeTimer = setTimeout(() => setShow(false), 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-2 text-black"></h2>
            <p className="text-gray-600 mb-4">
             Item added to cart!
            </p>
            <button
              onClick={() => setShow(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded-3xl hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
