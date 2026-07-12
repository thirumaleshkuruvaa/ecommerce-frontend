import { useRef } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const otpArray = otp.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("").padEnd(6, "").slice(0, 6);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const otpArray = otp.split("");
        otpArray[index] = "";
        setOtp(otpArray.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    setOtp(pastedData);

    const nextIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="otp-wrapper" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          className="otp-box"
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
