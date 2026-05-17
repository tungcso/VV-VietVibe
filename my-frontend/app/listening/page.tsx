import { Suspense } from "react";
import ListeningScreen from "../_components/listening-screen";

export default function ListeningPage() {
  return (
    <Suspense fallback={null}>
      <ListeningScreen />
    </Suspense>
  );
}
