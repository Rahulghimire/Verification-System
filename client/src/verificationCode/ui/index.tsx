import React from "react";
import { Flex, Form, Input, Typography } from "antd";
import { FormValuesProps } from "../types";
import { AntButton } from "../../common";
import { OTPUploader } from "../../services";

import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const VerificationCode: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = async (values: FormValuesProps) => {
    try {
      const data = await OTPUploader(values.otp_password);
      if (data?.success) {
        form.resetFields();
        localStorage.setItem("successToken", data.success);
        navigate("/success");
      } else {
        console.error("Verification failed:", data.message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  return (
    <Form onFinish={handleFinish} form={form}>
      <Flex
        vertical
        gap="small"
        align="center"
        justify="center"
        style={{
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Enter Verification Code
        </Text>
        <div>
          <Form.Item
            name={"otp_password"}
            required
            rules={[
              { required: true, message: "Please enter OTP Password" },
              {
                validator: (_, value) => {
                  if (value && !/^\d+$/.test(value)) {
                    return Promise.reject(new Error("OTP must be numeric"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.OTP formatter={(str) => str.toUpperCase()} autoFocus />
          </Form.Item>
        </div>
        <AntButton />
      </Flex>
    </Form>
  );
};

export default VerificationCode;
