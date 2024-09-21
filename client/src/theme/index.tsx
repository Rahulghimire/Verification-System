import { ConfigProvider, theme } from "antd";

interface Props {
  children?: React.ReactNode;
}
export const AppThemeProvider: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          fontFamily: "Inter",
          fontSize: 18,
        },
        components: {
          //   Menu: {
          //     darkItemColor: "#ffffff",
          //     itemHoverBg: "rgb(22,39,52)",
          //     horizontalItemHoverBg: "#FF3147",
          //     itemBg: "#021738",
          //     darkItemHoverBg: "#FF3147",
          //     darkPopupBg: "#1C2F4C",
          //     darkSubMenuItemBg: "#1C2F4C",
          //     fontFamily: "Inter",
          //   },
          Input: {
            activeBg: "rgb(237,237,249)",
            colorBorder: "rgb(0,0,0)",
            controlHeight: 40,
            inputFontSize: 20,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
