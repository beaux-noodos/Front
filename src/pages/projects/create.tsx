import { useGetToPath, useGo } from "@refinedev/core";
import { useSearchParams } from "react-router-dom";
import {ProjectDrawerForm} from "../../components/project/project-drawer-form";

export const ProjectCreate = () => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();

  return (
    <ProjectDrawerForm
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
