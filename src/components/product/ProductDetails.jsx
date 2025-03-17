import { useState, useRef } from "react";
import QuestionAnswer from "./QuestionAnswer";
import ReviewForm from "./ReviewForm";
import Details from "./Details";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("specifications");
  const sectionsRef = {
    specifications: useRef(null),
    details: useRef(null),
    qa: useRef(null),
    review: useRef(null),
  };

  const handleScroll = (section) => {
    setActiveTab(section);
    if (sectionsRef[section]?.current) {
      sectionsRef[section].current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Ensures section is properly positioned
      });
    }
  };

  return (
    <div className=" px-3 md:p-4 md:px-6">
      {/* Header Tabs */}
      <div className="flex max-w-sm md:max-w-xl space-x-1 md:space-x-8 bg-gray-800 font-medium text-xs md:text-lg ">
        {["specifications", "details", "qa", "review"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === tab ? "border-b-2 border-white text-white" : "text-gray-200"
            }`}
            onClick={() => handleScroll(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Sections */}
      <section ref={sectionsRef.specifications} className="py-6">
        <div className="text-sm md:text-lg">
          <p><strong>Brand:</strong> K2</p>
          <p><strong>Model:</strong> K2 Opula KCL-1029</p>
          <p><strong>Type:</strong> Screen Cleaner</p>
          <p><strong>Volume of Liquid:</strong> 100ml</p>
          <p><strong>Color:</strong> White</p>
          <p><strong>Warranty:</strong> No warranty</p>
          <p>
            <strong>Others:</strong> High-quality, non-toxic cleaning liquid for various screens.
          </p>
        </div>
      </section>

      <section ref={sectionsRef.details} className="py-6">
        <h2 className="text-md md:text-xl font-bold bg-gray-300 w-fit p-1 px-3">Details</h2>
        <Details />
      </section>

      <section ref={sectionsRef.qa} className="py-6">
        <h2 className="text-md md:text-xl font-bold bg-gray-300 w-fit p-1 px-3">Question and Answer</h2>
        <p className="text-sm md:text-lg">Ask a question about this product.</p>
        <QuestionAnswer />
      </section>

      <section ref={sectionsRef.review} className="py-6">
        <h2 className="text-md md:text-xl font-bold bg-gray-300 w-fit p-1 px-3">Review</h2>
        <p className="text-sm md:text-lg">Customer reviews will be shown here.</p>
        <ReviewForm />
      </section>
    </div>
  );
};

export default ProductDetails;
