import React from "react";
import { Truck, Headphones, RefreshCw, Lock, Tag } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-10 h-10 text-red-500" />,
    title: "Free Shipping",
    desc: "Get your orders delivered with no extra cost",
  },
  {
    icon: <Headphones className="w-10 h-10 text-red-500" />,
    title: "Support 24/7",
    desc: "We are here to assist you anytime",
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-red-500" />,
    title: "100% Money Back",
    desc: "Full refund if you are not satisfied",
  },
  {
    icon: <Lock className="w-10 h-10 text-red-500" />,
    title: "Payment Secure",
    desc: "Your payment info is safe with us",
  },
  {
    icon: <Tag className="w-10 h-10 text-red-500" />,
    title: "Discount",
    desc: "Enjoy the best prices on our products",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-12 w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
