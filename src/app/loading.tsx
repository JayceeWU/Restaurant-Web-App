import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
      }}
    >
      <Loader2 className="h-11 w-11 animate-spin text-primary" />
      <span className="ml-2">Loading...</span>
    </div>
  );
};

export default LoadingPage;
