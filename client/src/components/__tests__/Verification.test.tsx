import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VerificationCode from "../../verificationCode/ui";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { OTPUploader } from "../../services";
import "@testing-library/jest-dom/extend-expect";

import { FormInstance } from "antd/lib/form";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock OTPUploader
jest.mock("../../services/OTPService");

describe("VerificationCode Component", () => {
  const mockNavigate = useNavigate as jest.Mock;
  const mockResetFields = jest.fn();
  const mockFormInstance: Partial<FormInstance> = {
    resetFields: mockResetFields,
    getFieldValue: jest.fn(),
    setFieldsValue: jest.fn(),
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    (OTPUploader as jest.Mock).mockClear(); // Ensure OTPUploader is a Jest mock
    jest.spyOn(Form, "useForm").mockReturnValue([mockFormInstance] as any);
  });

  test("should render verification code component", () => {
    render(<VerificationCode />);
    expect(screen.getByText("Enter Verification Code")).toBeInTheDocument();
  });

  test("should submit the form with valid OTP", async () => {
    (OTPUploader as jest.Mock).mockResolvedValue({ success: true });

    render(<VerificationCode />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(OTPUploader).toHaveBeenCalledWith("123456");
      expect(localStorage.setItem).toHaveBeenCalledWith("successToken", "true");
      expect(mockResetFields).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/success");
    });
  });

  test("should show error on invalid OTP", async () => {
    (OTPUploader as jest.Mock).mockResolvedValue({
      success: false,
      message: "Invalid OTP",
    });

    render(<VerificationCode />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "000000" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(OTPUploader).toHaveBeenCalledWith("000000");
      expect(
        screen.queryByText("Verification failed: Invalid OTP")
      ).toBeInTheDocument();
    });
  });

  test("should show validation error when OTP is not numeric", async () => {
    render(<VerificationCode />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "abc123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("OTP must be numeric")).toBeInTheDocument();
    });
  });
});
