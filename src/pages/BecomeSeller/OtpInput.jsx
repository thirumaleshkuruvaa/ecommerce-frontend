const OtpInput = ({ otp, setOtp, error }) => {
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const otpArray = otp.split("");
    otpArray[index] = value;
    const updatedOtp = otpArray.join("");
    setOtp(updatedOtp);

    // move focus to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`seller-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`seller-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div>
      <div className="seller-otp-wrapper">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            id={`seller-otp-${index}`}
            type="text"
            maxLength="1"
            className={`seller-otp-box ${error ? "seller-otp-error" : ""}`}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      {error && <small className="text-danger d-block mt-2">{error}</small>}
    </div>
  );
};

export default OtpInput;
