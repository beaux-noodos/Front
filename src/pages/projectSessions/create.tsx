import { useGetToPath, useGo } from "@refinedev/core";
import { useSearchParams } from "react-router-dom";
import {ProjectSessionDrawerForm} from "../../components/projectSession/projectSession-drawer-form";

export const ProjectSessionCreate = () => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();

  return (
    <ProjectSessionDrawerForm
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
