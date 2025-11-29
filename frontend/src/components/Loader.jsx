import { Oval } from "react-loader-spinner";

export function Loader({ size = 80, color = "#4fa94d" }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Oval
        height={size}
        width={size}
        color={color}
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
}
