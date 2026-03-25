import Events from "@/src/modules/events/Events";
import { Suspense } from "react";
import LoadingPage from "@/src/components/layouts/LoadingPage";

const EventsPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Events />
    </Suspense>
  );
};

export default EventsPage;
