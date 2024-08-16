import { useGetToPath, useGo } from "@refinedev/core";
import { useSearchParams } from "react-router-dom";
import {LocationDrawerForm} from "../../components/location/location-drawer-form";

export const LocationCreate = () => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();

  return (
    <LocationDrawerForm
      action="create"
      onMutationSuccess={() => {
        go({
          to:
            searchParams.get("to") ??
            getToPath({
              action: "list",
            }) ??
            "",
          query: {
            to: undefined,
          },
          options: {
            keepQuery: true,
          },
          type: "replace",
        });
      }}
    />
  );
};
