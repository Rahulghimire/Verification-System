import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Flex, notification, Spin } from "antd";

export const AntButton: React.FC = () => {
  const colorPrimary = "#100249";

  return (
    <ConfigProvider theme={{ token: { colorPrimary: colorPrimary } }}>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          maxWidth: "200px",
        }}
      >
        Submit
      </Button>
    </ConfigProvider>
  );
};

export const LoadingFallback = () => (
  <Flex
    align="center"
    justify="center"
    style={{
      height: "100vh",
    }}
  >
    <Spin size="large" tip="Loading..." />
  </Flex>
);

export const errorElement = "This is an error fallback element";

interface NotificationProps {
  title: string;
  message: string;
  type: string;
}

export const Notifications = ({
  title,
  message,
  type,
}: NotificationProps): void => {
  notification.open({
    message: (
      <span
        style={{
          color:
            type === "success"
              ? "#10c469"
              : type === "error"
              ? "red"
              : "#f2994a",
        }}
      >
        {title}
      </span>
    ),
    className: "dark:!bg-[#1f1f1f]",
    style: { width: type === "info" ? 400 : undefined },
    description: message,
    icon:
      type === "success" ? (
        <CheckCircleOutlined
          style={{ color: "#10c469", marginRight: "-18px", marginTop: "10px" }}
        />
      ) : type === "error" ? (
        <CloseCircleOutlined
          style={{ color: "red", marginRight: "-18px", marginTop: "13px" }}
        />
      ) : (
        <ExclamationCircleOutlined
          style={{ color: "#f2994a", marginLeft: "4px" }}
        />
      ),
    placement: "bottomRight",
    duration: type === "info" ? 3 : 1,
  });
};
