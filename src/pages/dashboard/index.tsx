import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { CreateButton, List } from "@refinedev/antd";
import { ProductListCard} from "../../components";
import { type PropsWithChildren} from "react";
import { useLocation } from "react-router-dom";
import {BlogListCard} from "../../components/blog/blog-list-card";

export const DashboardPage = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { createUrl } = useNavigation();

  const t = useTranslate();

  return (
      <List
          breadcrumb={false}
          headerButtons={(props) => [
            <CreateButton
                {...props.createButtonProps}
                key="create"
                size="large"
                onClick={() => {
                  return go({
                    to: `${createUrl("products")}`,
                    query: {
                      to: pathname,
                    },
                    options: {
                      keepQuery: true,
                    },
                    type: "replace",
                  });
                }}
            >
              {t("products.actions.add")}
            </CreateButton>,
          ]}
      >
          <BlogListCard />
        {children}
      </List>
  );
};
