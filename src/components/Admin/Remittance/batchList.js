import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import ContentLoader from "react-content-loader";
import PageViewIcon from "@material-ui/icons/PageviewTwoTone";
import Fab from "@material-ui/core/Fab";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import PaymentIcon from "@material-ui/icons/PaymentOutlined";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DownloadOutline from "@material-ui/icons/CloudDownloadOutlined";
import MaterialTable, { MTableAction } from "material-table";

import moment from "moment";
import { CheckCircleOutline } from "mdi-material-ui";
import { Paper, Button } from "@material-ui/core";
import { Redirect } from "react-router";
import { RollbarContext } from "../../../rollbar-context";
import RemittancePaymentDetail from "./Detail";

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const downloadAba = url => {
  // Configuration to accept json as a default
  let token = window.localStorage.getItem("thnx.token");
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  return fetch(url, config)
    .then(response => response.blob())
    .then(blob => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "thnx_payment.aba";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
    });
};

export default function RemittanceBatchList(props) {
  const rollbar = React.useContext(RollbarContext);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(undefined);

  return (
    <React.Fragment>
      <Mutation
        mutation={gql`
          mutation UpdateRemittanceBatch($id: Int!) {
            updateRemittanceBatch(id: $id) {
              remittanceBatch {
                id
              }
              errors
            }
          }
        `}
      >
        {updateRemittanceBatch => {
          return (
            <div style={{ margin: "16px" }}>
              <Query
                query={gql`
                  {
                    remittanceBatches {
                      id
                      total
                      createdAt
                      paidAt
                      exportedAt
                      lineItemCount
                    }
                  }
                `}
                fetchPolicy="network-only"
                partialRefetch="true"
              >
                {({ loading, error, data, refetch }) => {
                  if (loading)
                    return (
                      <ContentLoader
                        height={160}
                        width={750}
                        speed={2}
                        primaryColor="#f7fafc"
                        secondaryColor="#edf2f7"
                      >
                        <rect
                          x="0"
                          y="15"
                          rx="0"
                          ry="0"
                          width="700"
                          height="20"
                        />
                        <circle cx="10" cy="50" r="8" />
                        <rect
                          x="25"
                          y="45"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="195"
                          y="45"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="365"
                          y="45"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="535"
                          y="45"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <circle cx="10" cy="80" r="8" />
                        <rect
                          x="25"
                          y="75"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="195"
                          y="75"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="365"
                          y="75"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="535"
                          y="75"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <circle cx="10" cy="110" r="8" />
                        <rect
                          x="25"
                          y="105"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="195"
                          y="105"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="365"
                          y="105"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="535"
                          y="105"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <circle cx="10" cy="140" r="8" />
                        <rect
                          x="25"
                          y="135"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="195"
                          y="135"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="365"
                          y="135"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                        <rect
                          x="535"
                          y="135"
                          rx="5"
                          ry="5"
                          width="150"
                          height="10"
                        />
                      </ContentLoader>
                    );

                  if (error) {
                    console.log(error);
                    rollbar.error(error);
                    return null;
                  }
                  return (
                    <React.Fragment>
                      {open && selected ? (
                        <RemittancePaymentDetail
                          open={open}
                          handleClose={() => setOpen(false)}
                          id={selected}
                        />
                      ) : (
                        undefined
                      )}
                      <MaterialTable
                        title=""
                        icons={tableIcons}
                        options={{
                          actionsColumnIndex: -1,
                          searchFieldAlignment: "left",
                          showTextRowsSelected: false,
                          exportButton: false,
                          pageSize: data.remittanceBatches.length > 5 ? 10 : 5,
                          showTitle: false,
                          elevation: 0,
                          headerStyle: {
                            fontFamily: "Roboto",
                            fontWeight: 400,
                            color: "#718096"
                          },
                          rowStyle: {
                            fontFamily: "Roboto",
                            fontWeight: 300,
                            color: "#595a5c"
                          },
                          search: true
                        }}
                        actions={[
                          {
                            icon: () => <RefreshIcon />,
                            tooltip: "Refresh",
                            isFreeAction: true,
                            onClick: (event, rowData) => {
                              refetch();
                            }
                          },
                          {
                            icon: () => <DownloadOutline />,
                            tooltip: "Download",
                            onClick: (event, rowData) => {
                              downloadAba(`/api/export/${rowData.id}`);
                              setTimeout(refetch(), 1500);
                            }
                          },
                          rowData => ({
                            icon: () => <PaymentIcon />,
                            tooltip: "Paid",
                            disabled: !rowData.exportedAt || rowData.paidAt,
                            onClick: (event, rowData) => {
                              updateRemittanceBatch({
                                variables: {
                                  id: parseInt(rowData.id)
                                }
                              }).then(
                                response => {
                                  // refetch users
                                  props.triggerRefresh();
                                  refetch();
                                },
                                error => {
                                  refetch();
                                  console.log(error);
                                }
                              );
                            }
                          })
                        ]}
                        components={{
                          Action: actionProps => {
                            if (actionProps.action.button) {
                              return (
                                <Button
                                  onClick={actionProps.action.onClick}
                                  disabled={actionProps.action.disabled}
                                  variant={actionProps.action.button.variant}
                                  color={actionProps.action.button.color}
                                  size="small"
                                >
                                  {actionProps.action.button.text}
                                </Button>
                              );
                            } else {
                              return <MTableAction {...actionProps} />;
                            }
                          },
                          Container: props => (
                            <Paper elevation={0}>{props.children}</Paper>
                          )
                        }}
                        columns={[
                          {
                            title: "Batch Id",
                            field: "id",
                            render: rowData => rowData.id,
                            defaultSort: "desc"
                          },
                          {
                            title: "Created",
                            field: "createdAt",
                            render: rowData =>
                              moment(rowData.createdAt).format("DD MMM YYYY")
                          },
                          {
                            title: "# Accounts",
                            field: "lineItemCount",
                            render: rowData => rowData.lineItemCount
                          },
                          {
                            title: "Total",
                            field: "total",
                            render: rowData =>
                              `$${(rowData.total / 1000).toFixed(2)}`
                          },
                          {
                            title: "Exported",
                            field: "exportedAt",
                            render: rowData =>
                              rowData.exportedAt
                                ? moment(rowData.exportedAt).format(
                                    "DD MMM YYYY"
                                  )
                                : undefined
                          },
                          {
                            title: "Paid",
                            field: "paidAt",
                            render: rowData =>
                              rowData.paidAt
                                ? moment(rowData.paidAt).format("DD MMM YYYY")
                                : undefined
                          }
                        ]}
                        data={data.remittanceBatches}
                      />
                    </React.Fragment>
                  );
                }}
              </Query>
            </div>
          );
        }}
      </Mutation>
    </React.Fragment>
  );
}
