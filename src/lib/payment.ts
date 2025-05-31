// src/utils/handleBuyProduct.ts
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const handleInitiatePayment = async (totalAmount: string, userId: string) => {
  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "INR"
      }),
    });

    if (!res.ok) {
      console.log("Failed to create order");
      return;
    }

    const data = await res.json();

    if (data.message === 'not-found') {
      console.log(data);
      // navigate(`/${data.otherFriendId}/hashedError`) // uncomment if using react-router
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ensure this is defined in your `.env`
      amount: totalAmount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://res.cloudinary.com/dphrayb6o/image/upload/v1724321840/q7sqftusa12xbwxuynkh.pmcng",
      order_id: data.id,
      callback_url: `${import.meta.env.VITE_BACKEND_URL}/api/payment/${userId}/paymentVerification`,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.error("Error in handleBuyProduct:", error);
  }
};
