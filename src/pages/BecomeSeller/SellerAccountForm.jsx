import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { createSeller } from "../../redux/seller/sellerThunk";
import SellerStep1Basic from "./SellerStep1Basic";
import SellerStep2Pickup from "./SellerStep2Pickup";
import SellerStep3Bank from "./SellerStep3Bank";
import SellerStep4Business from "./SellerStep4Business";

const steps = ["Basic", "Pickup", "Bank", "Business"];

const SellerAccountForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((store) => store.seller);

  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    sellerName: "",
    mobile: "",
    email: "",
    gstin: "",
    password: "",

    pickedUpAddress: {
      name: "",
      mobile: "",
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
    },

    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    },

    businessDetails: {
      businessName: "",
      businessEmail: "",
      businessMobile: "",
      logo: "",
      banner: "",
      businessAddress: "",
    },
  });

  const [errors, setErrors] = useState({});

  // normal top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // pickup fields
  const handlePickupChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      pickedUpAddress: {
        ...prev.pickedUpAddress,
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [`pickedUpAddress.${name}`]: "",
    }));
  };

  // bank fields
  const handleBankChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [`bankDetails.${name}`]: "",
    }));
  };

  // business fields
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [`businessDetails.${name}`]: "",
    }));
  };

  // VALIDATIONS STEP WISE
  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.sellerName.trim())
        newErrors.sellerName = "Please enter seller name";

      if (!formData.mobile.trim()) {
        newErrors.mobile = "Please enter mobile number";
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = "Mobile number must be 10 digits";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Please enter email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
        newErrors.email = "Enter valid email address";
      }

      if (!formData.gstin.trim()) newErrors.gstin = "Please enter GSTIN";
    }

    if (activeStep === 1) {
      const pickup = formData.pickedUpAddress;

      if (!pickup.name.trim())
        newErrors["pickedUpAddress.name"] = "Please enter pickup contact name";

      if (!pickup.mobile.trim()) {
        newErrors["pickedUpAddress.mobile"] = "Please enter pickup mobile";
      } else if (!/^\d{10}$/.test(pickup.mobile)) {
        newErrors["pickedUpAddress.mobile"] = "Pickup mobile must be 10 digits";
      }

      if (!pickup.address.trim())
        newErrors["pickedUpAddress.address"] = "Please enter address";

      if (!pickup.locality.trim())
        newErrors["pickedUpAddress.locality"] = "Please enter locality";

      if (!pickup.city.trim())
        newErrors["pickedUpAddress.city"] = "Please enter city";

      if (!pickup.state.trim())
        newErrors["pickedUpAddress.state"] = "Please enter state";

      if (!pickup.pincode.trim()) {
        newErrors["pickedUpAddress.pincode"] = "Please enter pincode";
      } else if (!/^\d{6}$/.test(pickup.pincode)) {
        newErrors["pickedUpAddress.pincode"] = "Pincode must be 6 digits";
      }
    }

    if (activeStep === 2) {
      const bank = formData.bankDetails;

      if (!bank.accountHolderName.trim()) {
        newErrors["bankDetails.accountHolderName"] =
          "Please enter account holder name";
      }

      if (!bank.accountNumber.trim()) {
        newErrors["bankDetails.accountNumber"] = "Please enter account number";
      }

      if (!bank.ifscCode.trim()) {
        newErrors["bankDetails.ifscCode"] = "Please enter IFSC code";
      }
    }

    if (activeStep === 3) {
      const business = formData.businessDetails;

      if (!business.businessName.trim()) {
        newErrors["businessDetails.businessName"] =
          "Please enter business name";
      }

      if (!business.businessEmail.trim()) {
        newErrors["businessDetails.businessEmail"] =
          "Please enter business email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(business.businessEmail)
      ) {
        newErrors["businessDetails.businessEmail"] =
          "Enter valid business email";
      }

      if (!business.businessMobile.trim()) {
        newErrors["businessDetails.businessMobile"] =
          "Please enter business mobile";
      } else if (!/^\d{10}$/.test(business.businessMobile)) {
        newErrors["businessDetails.businessMobile"] =
          "Business mobile must be 10 digits";
      }

      if (!formData.password.trim()) {
        newErrors.password = "Please create password";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateStep();
    if (!isValid) return;

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateStep();
    if (!isValid) return;

    const payload = {
      sellerName: formData.sellerName,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      gstin: formData.gstin,

      pickedUpAddress: {
        ...formData.pickedUpAddress,
      },

      bankDetails: {
        ...formData.bankDetails,
      },

      businessDetails: {
        ...formData.businessDetails,
      },
    };

    try {
      await dispatch(createSeller(payload)).unwrap();

      // after successful create, switch to login form
      setTimeout(() => {
        onSwitchToLogin?.();
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="seller-form-card">
      <div className="seller-form-top">
        <h3>Create Seller Account</h3>
        <p>Join GLOMO and start selling to customers across India</p>
      </div>

      {/* step progress */}
      <div className="seller-steps-progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`seller-step-pill ${
              index === activeStep
                ? "active"
                : index < activeStep
                  ? "completed"
                  : ""
            }`}
          >
            <span className="step-number">
              {index < activeStep ? <FaCheckCircle /> : index + 1}
            </span>
            <span className="step-label">{step}</span>
          </div>
        ))}
      </div>

      {/* alert messages */}
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && (
        <div className="alert alert-danger mt-3">
          {typeof error === "string" ? error : "Something went wrong"}
        </div>
      )}

      <div className="seller-step-body mt-4">
        {activeStep === 0 && (
          <SellerStep1Basic
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        )}

        {activeStep === 1 && (
          <SellerStep2Pickup
            formData={formData}
            errors={errors}
            handlePickupChange={handlePickupChange}
          />
        )}

        {activeStep === 2 && (
          <SellerStep3Bank
            formData={formData}
            errors={errors}
            handleBankChange={handleBankChange}
          />
        )}

        {activeStep === 3 && (
          <SellerStep4Business
            formData={formData}
            errors={errors}
            handleBusinessChange={handleBusinessChange}
            handleChange={handleChange}
          />
        )}
      </div>

      <div className="seller-step-footer">
        <button
          type="button"
          className="btn seller-btn-outline"
          onClick={handleBack}
          disabled={activeStep === 0 || loading}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

        {activeStep === steps.length - 1 ? (
          <button
            type="button"
            className="btn seller-btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Seller Account"}
          </button>
        ) : (
          <button
            type="button"
            className="btn seller-btn-primary"
            onClick={handleNext}
          >
            Continue
            <FaArrowRight className="ms-2" />
          </button>
        )}
      </div>

      <div className="seller-switch-text text-center mt-4">
        Already have a seller account?{" "}
        <button
          type="button"
          className="seller-link-btn"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
